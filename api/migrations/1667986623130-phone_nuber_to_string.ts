import { MigrationInterface, QueryRunner } from "typeorm";

export class phoneNuberToString1667986623130 implements MigrationInterface {
	name = "phoneNuberToString1667986623130";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "medical_company"
            DROP COLUMN "contact_phone"`);
		await queryRunner.query(`ALTER TABLE "medical_company"
            ADD "contact_phone" character varying`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		throw new Error("This migration cannot be reverted.");
	}
}
