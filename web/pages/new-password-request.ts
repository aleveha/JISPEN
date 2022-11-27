import { CaptchaDto } from "@api/auth/dto";
import { apiServer } from "@api/config";
import { fetcher } from "@api/index";
import { Page } from "@pages/auth/new-password-request-page";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
	const { data, error } = await fetcher<CaptchaDto>({
		axiosInstance: apiServer,
		method: "get",
		url: "/captcha/generate",
	});

	return {
		props: {
			data: data ?? null,
			error: error ?? null,
		},
	};
};

export default Page;
