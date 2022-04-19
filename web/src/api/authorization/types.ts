export interface User {
	id: number;
	email: string;
	passwordHash: string;
	serviceCode?: string;
	verifiedAt?: Date;
}
