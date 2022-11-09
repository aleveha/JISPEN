import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AddressModel } from "./address.model";
import { TemplateModel } from "./template.model";
import { TerritorialUnitModel } from "./territorialUnit.model";
import { UserModel } from "./user.model";

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
	@OneToOne(() => AddressModel, { cascade: ["insert", "update", "remove"] })
	address: AddressModel;

	@Column({ name: "contact_firstname", nullable: true })
	contactFirstName: string;

	@Column({ name: "contact_lastname", nullable: true })
	contactLastName: string;

	@Column({ name: "contact_phone", nullable: true })
	contactPhone: string;

	@Column({ name: "contact_email", nullable: true })
	contactEmail: string;

	@Column({ name: "user_id" })
	userId: number;

	@JoinColumn({ name: "user_id" })
	@ManyToOne(() => UserModel, user => user.medicalCompanies)
	user: UserModel;

	@OneToMany(() => TemplateModel, template => template.medicalCompany)
	templates: TemplateModel[];
}
