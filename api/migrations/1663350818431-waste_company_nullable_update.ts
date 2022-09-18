import { MigrationInterface, QueryRunner } from "typeorm";

export class wasteCompanyNullableUpdate1663350818431 implements MigrationInterface {
	name = "wasteCompanyNullableUpdate1663350818431";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "waste_company"
            ALTER COLUMN "uid" DROP NOT NULL`);
		await queryRunner.query(`ALTER TABLE "waste_company"
            ALTER COLUMN "company_id" DROP NOT NULL`);
		await queryRunner.query(`ALTER TABLE "waste_company"
            ALTER COLUMN "name" DROP NOT NULL`);
		await queryRunner.query(`ALTER TABLE "waste_company"
            ALTER COLUMN "address_id" DROP NOT NULL`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		throw new Error("This migration cannot be reverted.");
	}
}
