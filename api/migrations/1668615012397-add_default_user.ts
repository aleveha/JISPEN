import { MigrationInterface, QueryRunner } from "typeorm";

export class addDefaultUser1668615012397 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            INSERT INTO "user" (email, password)
            VALUES ('user@jispen.cz', '$2a$10$l8FxgqXpLjSDcthdOlqp0.JNqdRItojNNSbU.AKlVLjiA7SBrlkMO');
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		throw new Error("This migration cannot be reverted.");
	}
}
