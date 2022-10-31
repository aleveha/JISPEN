import { MigrationInterface, QueryRunner } from "typeorm";

export class uniqueUserEmail1667135644728 implements MigrationInterface {
	name = "uniqueUserEmail1667135644728";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user"
            ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		throw new Error("This migration cannot be reverted.");
	}
}
