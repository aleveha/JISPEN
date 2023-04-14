import { apiServer } from "@api/config";
import { fetcher } from "@api/index";
import { CataloguesDto } from "@api/templates/dto";
import { Template } from "@api/templates/types";
import { Page } from "@pages/templates/new-template-page";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ctx => {
	const { data: catalogues, error: cataloguesError } = await fetcher<CataloguesDto[]>({
		axiosInstance: apiServer,
		method: "get",
		url: "/templates/catalogues",
	});

	const accessToken = ctx.req.cookies["access_token"];
	const { data: template, error: templateError } = await fetcher<Template>({
		axiosInstance: apiServer,
		method: "get",
		url: `/templates/id/${ctx.params?.copyId}`,
		accessToken,
	});

	return {
		props: {
			data: catalogues ? { catalogues: catalogues, template: template ?? null } : null,
			error: (cataloguesError || templateError) ?? null,
		},
	};
};

export default Page;
