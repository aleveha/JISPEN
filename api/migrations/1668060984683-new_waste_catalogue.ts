import { MigrationInterface, QueryRunner } from "typeorm";

export class newWasteCatalogue1668060984683 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            INSERT INTO waste(uid, name, category)
            VALUES ('18010301', 'Ostré předměty, na jejichž sběr a odstraňování jsou kladeny zvláštní požadavky s ohledem na prevenci infekce', 'N');
            INSERT INTO waste(uid, name, category)
            VALUES ('18010302', 'Části těla a orgány včetně krevních vaků a krevních konzerv', 'N');
            INSERT INTO waste(uid, name, category)
            VALUES ('18020201', 'Ostré předměty, na jejichž sběr a odstraňování jsou kladeny zvláštní požadavky s ohledem na prevenci infekce', 'N');
            INSERT INTO waste(uid, name, category)
            VALUES ('20010101', 'Kompozitní a nápojové kartony', 'O');
            INSERT INTO waste(uid, name, category)
            VALUES ('20010101', 'Kompozitní a nápojové kartony', 'O/N');
            INSERT INTO waste(uid, name, category)
            VALUES ('20010801', 'Biologicky rozložitelný odpad z kuchyní a stravoven rostlinného původu', 'O');
            INSERT INTO waste(uid, name, category)
            VALUES ('20010801', 'Biologicky rozložitelný odpad z kuchyní a stravoven rostlinného původu', 'O/N');
            INSERT INTO waste(uid, name, category)
            VALUES ('20013501', 'Vyřazené motorové stroje, přístroje a zařízení obsahující nebezpečné látky určené k použití v domácnosti', 'N');
            INSERT INTO waste(uid, name, category)
            VALUES ('20013502', 'Tiskařské tonerové kazety mající nebezpečné vlastnosti', 'N');
            INSERT INTO waste(uid, name, category)
            VALUES ('20013601', 'Vyřazené motorové stroje, přístroje a zařízení určené k použití v domácnosti neuvedené pod číslem 20 01 35 01', 'O');
            INSERT INTO waste(uid, name, category)
            VALUES ('20013602', 'Tiskařské tonerové kazety neuvedené pod číslem 20 01 35 02', 'O');
            INSERT INTO waste(uid, name, category)
            VALUES ('20014001', 'Měď, bronz, mosaz', 'O');
            INSERT INTO waste(uid, name, category)
            VALUES ('20014001', 'Měď, bronz, mosaz', 'O/N');
            INSERT INTO waste(uid, name, category)
            VALUES ('20014002', 'Hliník', 'O');
            INSERT INTO waste(uid, name, category)
            VALUES ('20014002', 'Hliník', 'O/N');
            INSERT INTO waste(uid, name, category)
            VALUES ('20014003', 'Olovo', 'O');
            INSERT INTO waste(uid, name, category)
            VALUES ('20014003', 'Olovo', 'O/N');
            INSERT INTO waste(uid, name, category)
            VALUES ('20014004', 'Zinek', 'O');
            INSERT INTO waste(uid, name, category)
            VALUES ('20014004', 'Zinek', 'O/N');
            INSERT INTO waste(uid, name, category)
            VALUES ('20014005', 'Železo a ocel', 'O');
            INSERT INTO waste(uid, name, category)
            VALUES ('20014005', 'Železo a ocel', 'O/N');
            INSERT INTO waste(uid, name, category)
            VALUES ('20014006', 'Cín', 'O');
            INSERT INTO waste(uid, name, category)
            VALUES ('20014006', 'Cín', 'O/N');
            INSERT INTO waste(uid, name, category)
            VALUES ('20030101', 'Odděleně soustřeďovaný popel z domácností', 'O');
            INSERT INTO waste(uid, name, category)
            VALUES ('20030101', 'Odděleně soustřeďovaný popel z domácností', 'O/N');
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		throw new Error("This migration cannot be reverted.");
	}
}
