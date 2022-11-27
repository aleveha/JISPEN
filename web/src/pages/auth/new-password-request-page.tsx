import { CaptchaDto } from "@api/auth/dto";
import { withDashboardLayout } from "@shared/components/layout/layout";
import { DiscriminatedUnion } from "@shared/types/types";
import { PasswordResetFormEmail } from "@zones/authorization/forms/password-reset-form-email";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { SWRConfig } from "swr";

const NewPasswordPageComponent: NextPage<DiscriminatedUnion<CaptchaDto>> = ({ data, error }) => {
	const router = useRouter();

	if (error) {
		router.push("/").then(() => toast.error("Během načítání stránky se něco nepovedlo"));
		return null;
	}

	return (
		<SWRConfig value={{ fallback: { "/captcha/generate": data } }}>
			<PasswordResetFormEmail />
		</SWRConfig>
	);
};

export const Page = withDashboardLayout(NewPasswordPageComponent, "Žádost o registraci/obnovení hesla");
