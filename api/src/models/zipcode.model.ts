import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AddressModel } from "./address.model";

@Entity("zip_code")
export class ZipcodeModel extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	uid: number;

	@Column()
	name: string;

	@OneToMany(() => AddressModel, address => address.zipcode)
	addresses: AddressModel[];
}
