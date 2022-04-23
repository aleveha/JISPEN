import { UserModel } from "./user.model";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AddressModel } from "./address.model";
import { TerritorialUnitModel } from "./territorialUnit.model";
import { TemplateModel } from "./template.model";

@Entity("medical_company")
export class MedicalCompanyModel extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	uid: number;

	@Column({ name: "company_id" })
	companyId: string;

	@Column()
	name: string;

	@Column({ name: "territorial_unit_id" })
	territorialUnitId: number;

	@JoinColumn({ name: "territorial_unit_id" })
	@ManyToOne(() => TerritorialUnitModel, territorialUnit => territorialUnit.medicalCompanies)
	territorialUnit: TerritorialUnitModel;

	@Column({ name: "address_id" })
	addressId: number;

	@JoinColumn({ name: "address_id" })
	@OneToOne(() => AddressModel, { cascade: true })
	address: AddressModel;

	@Column({ name: "contact_firstname" })
	contactFirstName: string;

	@Column({ name: "contact_lastname" })
	contactLastName: string;

	@Column({ name: "contact_phone" })
	contactPhone: number;

	@Column({ name: "contact_email" })
	contactEmail: string;

	@Column({ name: "user_id" })
	userId: number;

	@JoinColumn({ name: "user_id" })
	@ManyToOne(() => UserModel, user => user.medicalCompanies)
	user: UserModel;

	@OneToMany(() => TemplateModel, template => template.medicalCompany)
	templates: TemplateModel[];
}
