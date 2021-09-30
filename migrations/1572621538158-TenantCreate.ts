import {MigrationInterface, QueryRunner} from 'typeorm';
import {addPK} from './MigrationHelper';

export class TenantCreate1572621538158 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "Tenant" (
      "id" integer NOT NULL,
      "domains" jsonb NOT NULL DEFAULT '[]'::jsonb,
      "name" character varying(255) NOT NULL,
      "alias" character varying(255) NOT NULL,
      "appConfig" jsonb NOT NULL DEFAULT '{"componentsVersion": 1}'::jsonb,
      "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
      ${addPK('Tenant', ['id'])}
    )`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "Tenant"`, undefined);
  }
}
