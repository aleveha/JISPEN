import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { TemplateModel } from "./template.model";

@Entity("loading_code")
export class LoadingCodeModel extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	uid: string;

	@Column()
	name: string;

	@ManyToMany(() => TemplateModel, template => template.loadingCodes)
	templates: TemplateModel[];
}
