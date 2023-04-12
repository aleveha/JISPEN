import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LoadingCodeModel } from "./loadingCode.model";
import { TemplateModel } from "./template.model";
import { WasteModel } from "./waste.model";
import { WasteCompanyModel } from "./wasteCompany.model";

@Entity("record")
export class RecordModel extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	date: Date;

	@Column({ type: "decimal" })
	amount: number;

	@Column({ type: "decimal", nullable: true })
	expense: number;

	@Column({ name: "template_id" })
	templateId: number;

	@JoinColumn({ name: "template_id" })
	@ManyToOne(() => TemplateModel, template => template.records, { onDelete: "CASCADE" })
	template: TemplateModel;

	@Column({ name: "waste_company_id", nullable: true })
	wasteCompanyId: number;

	@JoinColumn({ name: "waste_company_id" })
	@ManyToOne(() => WasteCompanyModel, wasteCompany => wasteCompany.records)
	wasteCompany: WasteCompanyModel;

	@Column({ name: "waste_id" })
	wasteId: number;

	@JoinColumn({ name: "waste_id" })
	@ManyToOne(() => WasteModel, waste => waste.records)
	waste: WasteModel;

	@Column({ name: "loading_code_id" })
	loadingCodeId: number;

	@JoinColumn({ name: "loading_code_id" })
	@ManyToOne(() => LoadingCodeModel, loadingCode => loadingCode.records)
	loadingCode: LoadingCodeModel;
}
