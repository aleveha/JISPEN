import { getLoadingCodes, getTerritorialUnits, getWaste, getZipCodes } from "@api/templates/catalogues";
import { LoadingCode, TerritorialUnit, Waste, Zipcode } from "@api/templates/types";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface UseCatalogueDataType {
	loadingCodes: LoadingCode[] | null;
	territorialUnits: TerritorialUnit[] | null;
	wastes: Waste[] | null;
	zipcodes: Zipcode[] | null;
}

interface UseCatalogueReturnType {
	catalogue: UseCatalogueDataType;
	isLoading: boolean;
}

export function useCatalogue(): UseCatalogueReturnType {
	const [isLoading, setIsLoading] = useState(true);
	const [loadingCodes, setLoadingCodes] = useState<LoadingCode[] | null>(null);
	const [territorialUnits, setTerritorialUnits] = useState<TerritorialUnit[] | null>(null);
	const [wastes, setWastes] = useState<Waste[] | null>(null);
	const [zipcodes, setZipcodes] = useState<Zipcode[] | null>(null);

	useEffect(() => {
		const loadingCodesPromise = getLoadingCodes().then(({ data, error }) => {
			if (error) {
				toast.error("Nepodařilo se načíst číselník kódů nakládání");
				return;
			}

			setLoadingCodes(data);
		});

		const territorialUnitsPromise = getTerritorialUnits().then(({ data, error }) => {
			if (error) {
				toast.error("Nepodařilo se načíst číselník krajů");
				return;
			}

			setTerritorialUnits(data);
		});

		const wastesPromise = getWaste().then(({ data, error }) => {
			if (error) {
				toast.error("Nepodařilo se načíst číselník odpadů");
				return;
			}

			setWastes(data);
		});

		const zipcodePromise = getZipCodes().then(({ data, error }) => {
			if (error) {
				toast.error("Nepodařilo se načíst číselník PSČ");
				return;
			}

			setZipcodes(data);
		});

		Promise.all([loadingCodesPromise, territorialUnitsPromise, wastesPromise, zipcodePromise]).then(() => {
			setIsLoading(false);
		});
	}, []);

	return { isLoading, catalogue: { loadingCodes, territorialUnits, wastes, zipcodes } };
}
