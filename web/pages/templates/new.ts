import { apiServer } from "@api/config";
import { fetcher } from "@api/index";
import { CataloguesDto } from "@api/templates/dto";
import { Page } from "@pages/templates/new-template-page";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ctx => {
	const accessToken = ctx.req.cookies["accessToken"];
	const { data, error } = await fetcher<CataloguesDto[]>({
		axiosInstance: apiServer,
		method: "get",
		url: "/templates/catalogues",
		accessToken,
	});

	return {
		props: {
			data: data ?? null,
			error: error ?? null,
		},
	};
};

export default Page;
