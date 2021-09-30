import {MigrationInterface, QueryRunner} from 'typeorm';
import {addFK, addPK} from './MigrationHelper';

export class DbPingCreate1572621664357 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "DbPing" (
      "tenantId" integer NOT NULL,
      "id" SERIAL NOT NULL,
      "success" integer NOT NULL,
      "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
      ${addPK('DbPing', ['tenantId', 'id'])},
      ${addFK('DbPing', ['tenantId'], 'Tenant', ['id'])}
    )`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "DbPing"`, undefined);
  }
}
