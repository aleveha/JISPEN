import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MedicalCompanyModel } from "./medicalCompany.model";
import { TemplateModel } from "./template.model";

@Entity("user")
export class UserModel extends BaseEntity {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	email: string;

	@Column({ name: "password" })
	passwordHash: string;

	@Column({ name: "service_code", nullable: true })
	serviceCode?: string;

	@Column({ name: "verified_at" })
	verifiedAt?: Date;

	@OneToMany(() => TemplateModel, template => template.user, { cascade: ["update", "remove"] })
	templates: TemplateModel[];

	@OneToMany(() => MedicalCompanyModel, medicalCompany => medicalCompany.user, {
		cascade: ["update", "remove"],
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	medicalCompanies: MedicalCompanyModel[];
}
