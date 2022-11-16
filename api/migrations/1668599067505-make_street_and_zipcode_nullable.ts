import { MigrationInterface, QueryRunner } from "typeorm";

export class makeStreetAndZipcodeNullable1668599067505 implements MigrationInterface {
	name = "makeStreetAndZipcodeNullable1668599067505";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "address"
            DROP CONSTRAINT "FK_3014645d63b65a9cec357cc8ba2"`);
		await queryRunner.query(`ALTER TABLE "address"
            ALTER COLUMN "street" DROP NOT NULL`);
		await queryRunner.query(`ALTER TABLE "address"
            ALTER COLUMN "zip_code_id" DROP NOT NULL`);
		await queryRunner.query(`ALTER TABLE "address"
            ADD CONSTRAINT "FK_3014645d63b65a9cec357cc8ba2" FOREIGN KEY ("zip_code_id") REFERENCES "zip_code" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		throw new Error("This migration cannot be reverted.");
	}
}
