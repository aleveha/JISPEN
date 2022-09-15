import { getUserTemplates } from "@api/templates";
import { Template } from "@api/templates/types";
import { Button } from "@shared/components/button/button";
import { withDashboardLayout } from "@shared/components/layout/layout";
import { DiscriminatedUnion } from "@shared/types/types";
import { useAuth } from "@zones/authorization/hooks/useAuth";
import { TemplatesTable } from "@zones/templates/components/templates-table";
import { NextPage } from "next";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface TemplatePageProps {
	templates: string[];
}

const AllTemplatesPageComponent: NextPage<DiscriminatedUnion<TemplatePageProps>> = () => {
	const user = useAuth();
	const [templates, setTemplates] = useState<Template[] | null>(null);

	const onDataChanged = useCallback((templates: Template[]) => setTemplates(templates), []);

	useEffect(() => {
		if (!user) {
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
	}, [user]);

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
			<div className="mt-8 flex w-full items-center justify-end">
				<Link href="/templates/new" passHref>
					<Button variant="primary">Nová šablona</Button>
				</Link>
			</div>
		</div>
	);
};

export const Page = withDashboardLayout(AllTemplatesPageComponent, "Vaše šablony");
