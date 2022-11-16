import { MigrationInterface, QueryRunner } from "typeorm";

export class removeCertificateFromWasteTable1668596673960 implements MigrationInterface {
	name = "removeCertificateFromWasteTable1668596673960";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "waste"
            DROP COLUMN IF EXISTS "certificate"`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		throw new Error("This migration cannot be reverted.");
	}
}
