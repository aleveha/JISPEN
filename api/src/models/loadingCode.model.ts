import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RecordModel } from "./record.model";
import { TemplateModel } from "./template.model";

@Entity("loading_code")
export class LoadingCodeModel extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	uid: string;

	@Column()
	name: string;

	@OneToMany(() => RecordModel, record => record.loadingCode)
	records: RecordModel[];

	@ManyToMany(() => TemplateModel, template => template.loadingCodes)
	templates: TemplateModel[];
}
