import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getLoadingCodes, getTerritorialUnits, getWaste, getZipCodes } from "@api/templates/catalogues";
import { LoadingCode, TerritorialUnit, Waste, Zipcode } from "@api/templates/types";
import { UseCatalogueReturnType } from "@zones/templates/hooks/types";

export function useCatalogue(): UseCatalogueReturnType {
	const [loadingCodes, setLoadingCodes] = useState<LoadingCode[]>([]);
	const [territorialUnits, setTerritorialUnits] = useState<TerritorialUnit[]>([]);
	const [wastes, setWastes] = useState<Waste[]>([]);
	const [zipcodes, setZipcodes] = useState<Zipcode[]>([]);

	useEffect(() => {
		getZipCodes().then(res => {
			if (res.error) {
				toast.error("Nepodařilo se načíst číselník PSČ");
				return;
			}

			if (res.data) {
				setZipcodes(res.data);
			}
		});

		getTerritorialUnits().then(res => {
			if (res.error) {
				toast.error("Nepodařilo se načíst číselník krajů");
				return;
			}

			if (res.data) {
				setTerritorialUnits(res.data);
			}
		});

		getWaste().then(res => {
			if (res.error) {
				toast.error("Nepodařilo se načíst číselník odpadů");
				return;
			}

			if (res.data) {
				setWastes(res.data);
			}
		});

		getLoadingCodes().then(res => {
			if (res.error) {
				toast.error("Nepodařilo se načíst číselník kódů nakládání");
				return;
			}

			if (res.data) {
				setLoadingCodes(res.data);
			}
		});
	}, []);

	return { loadingCodes, territorialUnits, wastes, zipcodes };
}
