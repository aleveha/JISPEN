import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WasteCompanyModel } from "./wasteCompany.model";

@Entity("waste_company_type")
export class WasteCompanyTypeModel extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	uid: number;

	@Column()
	name: string;

	@OneToMany(() => WasteCompanyModel, wasteCompany => wasteCompany.type)
	wasteCompanies: WasteCompanyModel[];
}
