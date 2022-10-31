import { Page } from "@pages/auth/login-page";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ctx => {
	const accessToken = ctx.req.cookies["accessToken"];
	if (accessToken) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};

export default Page;
