import { MigrationInterface, QueryRunner } from "typeorm";

export class removeUnusedFieldsFromUserModel1666107441820 implements MigrationInterface {
	name = "removeUnusedFieldsFromUserModel1666107441820";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user"
            DROP COLUMN "verified_at"`);
		await queryRunner.query(`ALTER TABLE "user"
            DROP COLUMN "service_code"`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		throw new Error("This migration cannot be reverted.");
	}
}
