import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RecordModel } from "./record.model";
import { TemplateModel } from "./template.model";

@Entity("waste")
export class WasteModel extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	uid: number;

	@Column()
	category: string;

	@Column()
	name: string;

	@ManyToMany(() => TemplateModel, template => template.wastes)
	templates: TemplateModel[];

	@OneToMany(() => RecordModel, record => record.waste)
	records: RecordModel[];
}
