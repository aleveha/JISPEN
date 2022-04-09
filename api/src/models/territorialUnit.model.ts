import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MedicalCompanyModel } from "./medicalCompany.model";

@Entity("territorial_unit")
export class TerritorialUnitModel extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	uid: number;

	@Column()
	name: string;

	@OneToMany(() => MedicalCompanyModel, medicalCompany => medicalCompany.territorialUnit)
	medicalCompanies: MedicalCompanyModel[];
}
