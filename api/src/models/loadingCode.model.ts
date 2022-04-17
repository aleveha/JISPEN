import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("loading_code")
export class LoadingCodeModel extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	uid: string;

	@Column()
	name: string;
}
