export function formatDate(date: Date): string {
	return new Date(date).toLocaleDateString("ru");
}

export function formatAmount(amount: number): string {
	const valueToString = amount.toString();
	const value = parseInt(valueToString[valueToString.length - 1], 10);

	if (value === 1) {
		return `${amount}\xa0tůna`;
	}

	if (value > 1 && value < 5) {
		return `${amount}\xa0tůny`;
	}

	if (value >= 5) {
		return `${amount}\xa0tůn`;
	}

	return "";
}
