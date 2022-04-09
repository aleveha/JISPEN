import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ZipcodeModel } from "./zipcode.model";

@Entity("address")
export class AddressModel extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	city: string;

	@Column()
	street: string;

	@Column({ name: "registry_number" })
	registryNumber: string;

	@Column({ name: "building_number" })
	buildingNumber: string;

	@Column({ name: "zip_code_id" })
	zipcodeId: number;

	@JoinColumn({ name: "zip_code_id" })
	@ManyToOne(() => ZipcodeModel, zipCode => zipCode.addresses)
	zipcode: ZipcodeModel;
}
