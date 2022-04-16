import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
