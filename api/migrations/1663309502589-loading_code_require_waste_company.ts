import { MigrationInterface, QueryRunner } from "typeorm";

export class loadingCodeRequireWasteCompany1663309502589 implements MigrationInterface {
	name = "loadingCodeRequireWasteCompany1663309502589";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "loading_code"
            ADD "require_waste_company" boolean NOT NULL DEFAULT false`);
		await queryRunner.query(`UPDATE "loading_code"
                                 SET "require_waste_company" = true
                                 WHERE uid = 'AN3'`);
		await queryRunner.query(`UPDATE "loading_code"
                                 SET "require_waste_company" = true
                                 WHERE uid = 'B00'`);
		await queryRunner.query(`UPDATE "loading_code"
                                 SET "require_waste_company" = true
                                 WHERE uid = 'BN3'`);
		await queryRunner.query(`UPDATE "loading_code"
                                 SET "require_waste_company" = true
                                 WHERE uid = 'CN3'`);

		await queryRunner.query(`ALTER TABLE "record"
            ALTER COLUMN "waste_company_id" DROP NOT NULL`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		throw new Error("This migration cannot be reverted.");
	}
}
