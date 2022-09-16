const EMAIL_REGEXP =
	/^(([^<>()[\]\\.,;:\s@À-ÖÙ-öù-ÿĀ-žḀ-ỿ"]+(\.[^<>()[\]\\.,;:\s@À-ÖÙ-öù-ÿĀ-žḀ-ỿ"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PHONE_REGEXP = /^(\+)?[\d\s]*$/;
const NUMBER_REGEXP = /^\d*$/;
const DECIMAL_REGEXP = /^\d(,|\.)?\d*$/;

function isOnlySpaces(value: unknown) {
	return typeof value === "string" && value.length > 0 && value.trim() === "";
}

export const Validator = {
	DECIMAL_REGEXP,
	EMAIL_REGEXP,
	NUMBER_REGEXP,
	PHONE_REGEXP,
	isOnlySpaces,
};
