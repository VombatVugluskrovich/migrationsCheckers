import {MigrationInterface, QueryRunner} from 'typeorm';
import {addFK, addPK, addUQ} from './MigrationHelper';

export class UserCreate1574384688807 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "User" (
      "tenantId" integer NOT NULL,
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "email" character varying(255) NOT NULL,
      "passwordHash" character varying(255) NOT NULL,
      "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
      "roles" CHARACTER VARYING (255)[],
      "deletionDate" TIMESTAMP DEFAULT NULL,
      ${addPK('User', ['tenantId', 'id'])},
      ${addFK('User', ['tenantId'], 'Tenant', ['id'])},
      ${addUQ('User', ['tenantId', 'email'])}
    )`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "User"`, undefined);
  }
}
