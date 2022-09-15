import { withDashboardLayout } from "@shared/components/layout/layout";
import { NewRecordForm } from "@zones/records/forms/new-record-form";
import { NextPage } from "next";
import React from "react";

const CreateRecordPage: NextPage = () => {
	return <NewRecordForm />;
};

export default withDashboardLayout(CreateRecordPage, "Nová evidence");
