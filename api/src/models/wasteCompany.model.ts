import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AddressModel } from "./address.model";
import { RecordModel } from "./record.model";
import { TerritorialUnitModel } from "./territorialUnit.model";
import { TemplateModel } from "./template.model";

@Entity("waste_company")
export class WasteCompanyModel extends BaseEntity {
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
	@OneToOne(() => AddressModel)
	address: AddressModel;

	@Column({ name: "template_id" })
	templateId: number;

	@JoinColumn({ name: "template_id" })
	@ManyToOne(() => TemplateModel, template => template.wasteCompanies)
	template: TemplateModel;

	@OneToMany(() => RecordModel, record => record.wasteCompany)
	records: RecordModel[];
}
