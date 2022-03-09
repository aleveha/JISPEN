import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class UserModel extends BaseEntity {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	email: string;

	@Column({ name: "password" })
	passwordHash: string;

	@Column({ name: "service_code" })
	serviceCode?: string;

	@Column({ name: "verified_at" })
	verifiedAt?: Date;
}
