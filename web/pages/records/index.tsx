import { apiServer } from "@api/config";
import { fetcher } from "@api/index";
import { Record } from "@api/records/types";
import { Page } from "@pages/records/all-records-page";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ctx => {
	const accessToken = ctx.req.cookies["accessToken"];
	const { data, error } = await fetcher<Record[]>({
		axiosInstance: apiServer,
		method: "get",
		url: "/records/all",
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
