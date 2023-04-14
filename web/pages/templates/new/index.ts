import { apiServer } from "@api/config";
import { fetcher } from "@api/index";
import { CataloguesDto } from "@api/templates/dto";
import { Page } from "@pages/templates/new-template-page";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
	const { data, error } = await fetcher<CataloguesDto[]>({
		axiosInstance: apiServer,
		method: "get",
		url: "/templates/catalogues",
	});

	return {
		props: {
			data: data ? { catalogues: data } : null,
			error: error ?? null,
		},
		revalidate: 10,
	};
};

export default Page;
