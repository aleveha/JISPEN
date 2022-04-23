import React from "react";
import { NextPage } from "next";
import { withLayout } from "@zones/shared/components/layout";
import { CreateRecordForm } from "@zones/records/forms/CreateRecordForm";

const CreateRecordPage: NextPage = () => {
	return <CreateRecordForm />;
};

export default withLayout(CreateRecordPage, "Nová evidence");
