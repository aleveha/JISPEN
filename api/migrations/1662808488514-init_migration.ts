import { MigrationInterface, QueryRunner } from "typeorm";

export class initMigration1662808488514 implements MigrationInterface {
	name = "initMigration1662808488514";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE "zip_code"
                             (
                                 "id"   SERIAL            NOT NULL,
                                 "uid"  integer           NOT NULL,
                                 "name" character varying NOT NULL,
                                 CONSTRAINT "PK_23e29929d32a535be7820652aad" PRIMARY KEY ("id")
                             )`);
		await queryRunner.query(
			`CREATE TABLE "address"
       (
           "id"              SERIAL            NOT NULL,
           "city"            character varying NOT NULL,
           "street"          character varying NOT NULL,
           "registry_number" character varying NOT NULL,
           "building_number" character varying NOT NULL,
           "zip_code_id"     integer           NOT NULL,
           CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id")
       )`
		);
		await queryRunner.query(
			`CREATE TABLE "user"
       (
           "id"           SERIAL            NOT NULL,
           "email"        character varying NOT NULL,
           "password"     character varying NOT NULL,
           "service_code" character varying,
           "verified_at"  TIMESTAMP         NOT NULL,
           CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
       )`
		);
		await queryRunner.query(`CREATE TABLE "territorial_unit"
                             (
                                 "id"   SERIAL            NOT NULL,
                                 "uid"  integer           NOT NULL,
                                 "name" character varying NOT NULL,
                                 CONSTRAINT "PK_268fc130179987a8abd76424a50" PRIMARY KEY ("id")
                             )`);
		await queryRunner.query(
			`CREATE TABLE "medical_company"
       (
           "id"                  SERIAL            NOT NULL,
           "uid"                 integer           NOT NULL,
           "company_id"          character varying NOT NULL,
           "name"                character varying NOT NULL,
           "territorial_unit_id" integer           NOT NULL,
           "address_id"          integer           NOT NULL,
           "contact_firstname"   character varying,
           "contact_lastname"    character varying,
           "contact_phone"       integer,
           "contact_email"       character varying,
           "user_id"             integer           NOT NULL,
           CONSTRAINT "REL_974c9464f6df460e71657f74d8" UNIQUE ("address_id"),
           CONSTRAINT "PK_76826f867546fcc781bffce9393" PRIMARY KEY ("id")
       )`
		);
		await queryRunner.query(
			`CREATE TABLE "waste"
       (
           "id"          SERIAL            NOT NULL,
           "uid"         integer           NOT NULL,
           "category"    character varying NOT NULL,
           "name"        character varying NOT NULL,
           "certificate" character varying,
           CONSTRAINT "PK_f9168df990c4ee8a4c4b94724b1" PRIMARY KEY ("id")
       )`
		);
		await queryRunner.query(
			`CREATE TABLE "waste_company"
       (
           "id"                  SERIAL            NOT NULL,
           "uid"                 integer           NOT NULL,
           "company_id"          character varying NOT NULL,
           "name"                character varying NOT NULL,
           "type_id"             integer           NOT NULL,
           "territorial_unit_id" integer           NOT NULL,
           "address_id"          integer           NOT NULL,
           "template_id"         integer           NOT NULL,
           CONSTRAINT "REL_67b2b6cb6ca638e7ef5158c181" UNIQUE ("address_id"),
           CONSTRAINT "PK_76d1c588491dd9d110eee1f7f73" PRIMARY KEY ("id")
       )`
		);
		await queryRunner.query(`CREATE TABLE "waste_company_type"
                             (
                                 "id"   SERIAL            NOT NULL,
                                 "uid"  integer           NOT NULL,
                                 "name" character varying NOT NULL,
                                 CONSTRAINT "PK_6f61e88d93e80f2da4908daf576" PRIMARY KEY ("id")
                             )`);
		await queryRunner.query(
			`CREATE TABLE "template"
       (
           "id"                 SERIAL            NOT NULL,
           "title"              character varying NOT NULL,
           "medical_company_id" integer           NOT NULL,
           "user_id"            integer           NOT NULL,
           "expired_at"         TIMESTAMP,
           CONSTRAINT "PK_fbae2ac36bd9b5e1e793b957b7f" PRIMARY KEY ("id")
       )`
		);
		await queryRunner.query(
			`CREATE TABLE "record"
       (
           "id"               SERIAL    NOT NULL,
           "date"             TIMESTAMP NOT NULL,
           "amount"           numeric   NOT NULL,
           "template_id"      integer   NOT NULL,
           "waste_company_id" integer   NOT NULL,
           "waste_id"         integer   NOT NULL,
           "loading_code_id"  integer   NOT NULL,
           CONSTRAINT "PK_5cb1f4d1aff275cf9001f4343b9" PRIMARY KEY ("id")
       )`
		);
		await queryRunner.query(`CREATE TABLE "loading_code"
                             (
                                 "id"   SERIAL            NOT NULL,
                                 "uid"  character varying NOT NULL,
                                 "name" character varying NOT NULL,
                                 CONSTRAINT "PK_2f001eb70ed2e39c6fbf8267155" PRIMARY KEY ("id")
                             )`);
		await queryRunner.query(`CREATE TABLE "template_loading_code"
                             (
                                 "template_id"     integer NOT NULL,
                                 "loading_code_id" integer NOT NULL,
                                 CONSTRAINT "PK_3e3a3efae3ee19c78d9cfe1d9d8" PRIMARY KEY ("template_id", "loading_code_id")
                             )`);
		await queryRunner.query("CREATE INDEX \"IDX_99e60e67216049b858b8bd1284\" ON \"template_loading_code\" (\"template_id\") ");
		await queryRunner.query("CREATE INDEX \"IDX_31648a65bd8f85a04bb031c9eb\" ON \"template_loading_code\" (\"loading_code_id\") ");
		await queryRunner.query(`CREATE TABLE "template_waste"
                             (
                                 "template_id" integer NOT NULL,
                                 "waste_id"    integer NOT NULL,
                                 CONSTRAINT "PK_c35409b58107ffe065e42b3ec70" PRIMARY KEY ("template_id", "waste_id")
                             )`);
		await queryRunner.query("CREATE INDEX \"IDX_7baf2672eab376e79a8c629472\" ON \"template_waste\" (\"template_id\") ");
		await queryRunner.query("CREATE INDEX \"IDX_989f6db1dfaeec735f44b58996\" ON \"template_waste\" (\"waste_id\") ");

		await queryRunner.query(`ALTER TABLE "address"
        ADD CONSTRAINT "FK_3014645d63b65a9cec357cc8ba2" FOREIGN KEY ("zip_code_id") REFERENCES "zip_code" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

		await queryRunner.query(`ALTER TABLE "medical_company"
        ADD CONSTRAINT "FK_c85e2a0fb9495ef23f29d036755" FOREIGN KEY ("territorial_unit_id") REFERENCES "territorial_unit" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
		await queryRunner.query(`ALTER TABLE "medical_company"
        ADD CONSTRAINT "FK_974c9464f6df460e71657f74d8a" FOREIGN KEY ("address_id") REFERENCES "address" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
		await queryRunner.query(`ALTER TABLE "medical_company"
        ADD CONSTRAINT "FK_279257866b6cf878c951a59e6e4" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

		await queryRunner.query(`ALTER TABLE "waste_company"
        ADD CONSTRAINT "FK_d9300684dadeea1c0eda4337335" FOREIGN KEY ("territorial_unit_id") REFERENCES "territorial_unit" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
		await queryRunner.query(`ALTER TABLE "waste_company"
        ADD CONSTRAINT "FK_67b2b6cb6ca638e7ef5158c181c" FOREIGN KEY ("address_id") REFERENCES "address" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
		await queryRunner.query(`ALTER TABLE "waste_company"
        ADD CONSTRAINT "FK_42770a5e2faaa24fc9b5a9721c9" FOREIGN KEY ("template_id") REFERENCES "template" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
		await queryRunner.query(`ALTER TABLE "waste_company"
        ADD CONSTRAINT "FK_6f61e88d93e80f2da4908daf576" FOREIGN KEY ("type_id") REFERENCES "waste_company_type" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

		await queryRunner.query(`ALTER TABLE "template"
        ADD CONSTRAINT "FK_efc03113ca3e01f24d231aab043" FOREIGN KEY ("medical_company_id") REFERENCES "medical_company" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
		await queryRunner.query(`ALTER TABLE "template"
        ADD CONSTRAINT "FK_8e88152c46dcdac7827f32b9267" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

		await queryRunner.query(`ALTER TABLE "record"
        ADD CONSTRAINT "FK_dc4adfecb446ca0eb47d240fe24" FOREIGN KEY ("template_id") REFERENCES "template" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
		await queryRunner.query(`ALTER TABLE "record"
        ADD CONSTRAINT "FK_fe9911e234cbb90ed43a77266df" FOREIGN KEY ("waste_company_id") REFERENCES "waste_company" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
		await queryRunner.query(`ALTER TABLE "record"
        ADD CONSTRAINT "FK_b67fdb636322b24be702bde52cc" FOREIGN KEY ("waste_id") REFERENCES "waste" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
		await queryRunner.query(`ALTER TABLE "record"
        ADD CONSTRAINT "FK_2e60968ba59cf83953f5b4f68c0" FOREIGN KEY ("loading_code_id") REFERENCES "loading_code" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

		await queryRunner.query(`ALTER TABLE "template_loading_code"
        ADD CONSTRAINT "FK_99e60e67216049b858b8bd1284b" FOREIGN KEY ("template_id") REFERENCES "template" ("id") ON DELETE CASCADE ON UPDATE CASCADE`);
		await queryRunner.query(`ALTER TABLE "template_loading_code"
        ADD CONSTRAINT "FK_31648a65bd8f85a04bb031c9eb4" FOREIGN KEY ("loading_code_id") REFERENCES "loading_code" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

		await queryRunner.query(`ALTER TABLE "template_waste"
        ADD CONSTRAINT "FK_7baf2672eab376e79a8c6294729" FOREIGN KEY ("template_id") REFERENCES "template" ("id") ON DELETE CASCADE ON UPDATE CASCADE`);
		await queryRunner.query(`ALTER TABLE "template_waste"
        ADD CONSTRAINT "FK_989f6db1dfaeec735f44b58996f" FOREIGN KEY ("waste_id") REFERENCES "waste" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		throw new Error("This migration cannot be reverted.");
	}
}
