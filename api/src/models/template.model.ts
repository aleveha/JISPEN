import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LoadingCodeModel } from "./loadingCode.model";
import { MedicalCompanyModel } from "./medicalCompany.model";
import { RecordModel } from "./record.model";
import { UserModel } from "./user.model";
import { WasteModel } from "./waste.model";
import { WasteCompanyModel } from "./wasteCompany.model";

@Entity("template")
export class TemplateModel extends BaseEntity {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	title: string;

	@Column({ name: "medical_company_id" })
	medicalCompanyId: number;

	@JoinColumn({ name: "medical_company_id" })
	@ManyToOne(() => MedicalCompanyModel, medicalCompany => medicalCompany.templates, { cascade: ["insert", "update"] })
	medicalCompany: MedicalCompanyModel;

	@Column({ name: "user_id" })
	userId: number;

	@JoinColumn({ name: "user_id" })
	@ManyToOne(() => UserModel, user => user.templates)
	user: UserModel;

	@Column({ name: "expired_at", nullable: true })
	expiredAt?: Date;

	@JoinTable({
		name: "template_loading_code",
		joinColumn: { name: "template_id", referencedColumnName: "id" },
		inverseJoinColumn: { name: "loading_code_id", referencedColumnName: "id" },
	})
	@ManyToMany(() => LoadingCodeModel, loadingCode => loadingCode.templates)
	loadingCodes: LoadingCodeModel[];

	@JoinTable({
		name: "template_waste",
		joinColumn: { name: "template_id", referencedColumnName: "id" },
		inverseJoinColumn: { name: "waste_id", referencedColumnName: "id" },
	})
	@ManyToMany(() => WasteModel, waste => waste.templates)
	wastes: WasteModel[];

	@OneToMany(() => WasteCompanyModel, wasteCompany => wasteCompany.template, { cascade: ["insert", "update", "remove"] })
	wasteCompanies: WasteCompanyModel[];

	@OneToMany(() => RecordModel, record => record.template, { cascade: ["update", "remove"] })
	records: RecordModel[];
}
