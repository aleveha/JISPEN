import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserModel } from "./user.model";
import { MedicalCompanyModel } from "./medicalCompany.model";

@Entity("template")
export class TemplateModel extends BaseEntity {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	title: string;

	@Column({ name: "medical_company_id" })
	medicalCompanyId: number;

	@JoinColumn({ name: "medical_company_id" })
	@ManyToOne(() => MedicalCompanyModel, medicalCompany => medicalCompany.templates)
	medicalCompany: MedicalCompanyModel;

	@Column({ name: "user_id" })
	userId: number;

	@JoinColumn({ name: "user_id" })
	@ManyToOne(() => UserModel, user => user.templates)
	user: UserModel;

	@Column({ name: "expired_at" })
	expiredAt?: Date;
}
