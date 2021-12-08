import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableUser1638951968187 implements MigrationInterface {
  name = 'createTableUser1638951968187';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."User_gender_enum" AS ENUM('Male', 'Female', 'Other')`,
    );
    await queryRunner.query(
      `CREATE TABLE "User" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "email" character varying(32) NOT NULL, 
        "password" character varying NOT NULL, 
        "username" character varying(12) NOT NULL, 
        "gender" "public"."User_gender_enum" NOT NULL, 
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "User"`);
    await queryRunner.query(`DROP TYPE "public"."User_gender_enum"`);
  }
}
