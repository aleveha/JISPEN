import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
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

	@Column()
	certificate: string;

	@ManyToMany(() => TemplateModel, template => template.wastes)
	templates: TemplateModel[];
}
