import { formatDecimal } from "@shared/utils/validator/helpers";

const EMAIL_REGEXP =
	/^(([^<>()[\]\\.,;:\s@À-ÖÙ-öù-ÿĀ-žḀ-ỿ"]+(\.[^<>()[\]\\.,;:\s@À-ÖÙ-öù-ÿĀ-žḀ-ỿ"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PHONE_REGEXP = /^(\+420)\d{9}$/;
const NUMBER_REGEXP = /^\d+$/;
const DECIMAL_REGEXP = /^-?\d(,|\.)?\d*$/;

function isOnlySpaces(value: unknown) {
	return typeof value === "string" && value.length > 0 && value.trim() === "";
}

function onlyPositiveNumber(value: string) {
	if (Validator.isOnlySpaces(value)) {
		return "Zadejte platnou hodnotu";
	}
	
	if (parseFloat(formatDecimal(value)) < 0) {
		return "Zadejte kladnou hodnotu";
	}

	if (parseFloat(formatDecimal(value)) === 0) {
		return "Zadejte nenulovou hodnotu";
	}

	return undefined;
}

export const Validator = {
	DECIMAL_REGEXP,
	EMAIL_REGEXP,
	NUMBER_REGEXP,
	PHONE_REGEXP,
	isOnlySpaces,
	onlyPositiveNumber,
};
