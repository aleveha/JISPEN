import { apiServer } from "@api/config";
import { fetcher } from "@api/index";
import { MedicalCompany, Template } from "@api/templates/types";
import { Page } from "@pages/export-page";
import { GetServerSideProps } from "next";

function removeDuplicates(templates: Template[]): MedicalCompany[] {
	return templates
		.map(template => template.medicalCompany)
		.filter(
			(medicalCompany, index, self) => index === self.findIndex(t => t.companyId === medicalCompany.companyId && t.uid === medicalCompany.uid)
		);
}

export const getServerSideProps: GetServerSideProps = async ctx => {
	const accessToken = ctx.req.cookies["access_token"];
	const { data, error } = await fetcher<Template[]>({
		axiosInstance: apiServer,
		method: "get",
		url: "/templates/all",
		accessToken,
	});

	return {
		props: {
			data: data ? removeDuplicates(data) : null,
			error: error ?? null,
		},
	};
};

export default Page;
