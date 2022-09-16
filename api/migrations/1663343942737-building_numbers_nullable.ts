import { MigrationInterface, QueryRunner } from "typeorm";

export class buildingNumbersNullable1663343942737 implements MigrationInterface {
	name = "buildingNumbersNullable1663343942737";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            INSERT INTO waste("uid", "name", "category")
            VALUES ('150101', 'Papírové a lepenkové obaly', 'O')
		`);

		await queryRunner.query(`ALTER TABLE "address"
            ALTER COLUMN "registry_number" DROP NOT NULL`);
		await queryRunner.query(`ALTER TABLE "address"
            ALTER COLUMN "building_number" DROP NOT NULL`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		throw new Error("This migration cannot be reverted.");
	}
}
