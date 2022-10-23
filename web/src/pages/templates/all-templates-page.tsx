import { Template } from "@api/templates/types";
import { Button } from "@shared/components/button/button";
import { withDashboardLayout } from "@shared/components/layout/layout";
import { DiscriminatedUnion } from "@shared/types/types";
import { TemplatesTable } from "@zones/templates/components/templates-table";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const AllTemplatesPageComponent: NextPage<DiscriminatedUnion<Template[]>> = ({ data, error }) => {
	const router = useRouter();
	const [templates, setTemplates] = useState<Template[] | null>(data ?? null);
	const onDataChanged = useCallback((templates: Template[]) => setTemplates(templates), []);

	useEffect(() => {
		if (error) {
			if (error.statusCode === 401) {
				router.push("/login").then(() => toast.error("Musíte se nejdřív přihlásit"));
				return;
			}

			toast.error("Vyskytla se\xa0chyba během načítání šablon");
		}
	}, [error, router]);

	if (!templates || error) {
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
