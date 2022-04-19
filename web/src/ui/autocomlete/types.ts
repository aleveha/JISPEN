export interface AutocompleteOption {
	id: number;
}

export interface AutocompleteProps<T extends AutocompleteOption> {
	data: T[];
	displayValueKey: keyof T;
	errorMessage: string;
	filterBy: keyof T;
	selectDisplayValueKey: (keyof T)[];
}
