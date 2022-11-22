import { MigrationInterface, QueryRunner } from "typeorm";

export class editLoadingCodes1669123420446 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`UPDATE "loading_code"
             SET "require_waste_company" = true
             WHERE "uid" = 'A20'`
		);
		await queryRunner.query(
			`INSERT INTO loading_code("uid", "name", "require_waste_company")
             VALUES ('BN30', 'Převzetí odpadu od fyzických nepodnikajících osob – občanů', true)`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		throw new Error("This migration cannot be reverted.");
	}
}
