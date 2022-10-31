import { withDashboardLayout } from "@shared/components/layout/layout";
import { PasswordResetFormPassword } from "@zones/authorization/forms/password-reset-form-password";
import { NextPage } from "next";
import { useRouter } from "next/router";

const NewPasswordPageComponent: NextPage = () => {
	const router = useRouter();
	const { accessToken } = router.query;
	return <PasswordResetFormPassword accessToken={accessToken as string} />;
};

export const Page = withDashboardLayout(NewPasswordPageComponent, "Nastavení nového hesla");
