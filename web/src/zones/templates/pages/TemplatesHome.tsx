import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRecoilState } from "recoil";
import { getUserTemplates } from "@api/templates";
import { Template } from "@api/templates/types";
import { userState } from "@state/user";
import { withLayout } from "@zones/shared/components/layout";
import { TemplatesTable } from "@zones/templates/components/table";
import { Button } from "@ui/button";
import { ButtonType } from "@ui/button/types";

interface TemplatePageProps extends Record<string, unknown> {
	templates: string[];
}

const TemplatesHomePage: NextPage<TemplatePageProps> = () => {
	const router = useRouter();
	const [user] = useRecoilState(userState);
	const [templates, setTemplates] = useState<Template[] | null>(null);

	const onDataChanged = useCallback((templates: Template[]) => {
		setTemplates(templates);
	}, []);

	useEffect(() => {
		if (!user) {
			router.push("/login");
			return;
		}

		getUserTemplates(user.id)
			.then(response => {
				if (response.data) {
					setTemplates(response.data);
					return;
				}

				if (response.error) {
					toast.error("Vyskytla se\xa0chyba během načítání šablon");
					return;
				}
			})
			.catch(() => {
				toast.error("Vyskytla se\xa0chyba během načítání šablon");
			});
	}, [user, router, templates]);

	if (!templates) {
		return null;
	}

	return (
		<div className="h-max">
			{templates.length == 0 ? (
				<p className="text-xl text-grey">Zatím nemáte žádné šablony</p>
			) : (
				<TemplatesTable data={templates} onDataChange={onDataChanged} />
			)}
			<div className="w-full flex justify-end items-center mt-8">
				<Link href="/templates/new" passHref>
					<Button variant={ButtonType.primary}>Nová šablona</Button>
				</Link>
			</div>
		</div>
	);
};

export default withLayout(TemplatesHomePage, "Vaše šablony");
