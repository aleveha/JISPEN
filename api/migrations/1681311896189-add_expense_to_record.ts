import { MigrationInterface, QueryRunner } from "typeorm";

export class AddExpenseToRecord1681311896189 implements MigrationInterface {
	name = "AddExpenseToRecord1681311896189";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE "record" ADD "expense" numeric');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE "record" DROP COLUMN "expense"');
	}
}
