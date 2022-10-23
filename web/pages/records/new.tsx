import { apiServer } from "@api/config";
import { fetcher } from "@api/index";
import { Template } from "@api/templates/types";
import { Page } from "@pages/records/new-record-page";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ctx => {
	const accessToken = ctx.req.cookies["accessToken"];
	const { data, error } = await fetcher<Template[]>({
		axiosInstance: apiServer,
		method: "get",
		url: "/templates/all",
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
