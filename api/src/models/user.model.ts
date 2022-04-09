import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TemplateModel } from "./template.model";
import { MedicalCompanyModel } from "./medicalCompany.model";

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

	@OneToMany(() => TemplateModel, template => template.user)
	templates: TemplateModel[];

	@OneToMany(() => MedicalCompanyModel, medicalCompany => medicalCompany.user)
	medicalCompanies: MedicalCompanyModel[];
}
