import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableProduct1638952344990 implements MigrationInterface {
  name = 'createTableProduct1638952344990';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Product" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "userId" uuid NOT NULL, "name" character varying(255) NOT NULL, 
        "category" character varying(64) NOT NULL, 
        "image" character varying, 
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        CONSTRAINT "PK_9fc040db7872192bbc26c515710" PRIMARY KEY ("id")
      )`,
    );
    await queryRunner.query(
      `ALTER TABLE "Product" ADD CONSTRAINT "FK_de75905c3b4987f4b5bb1472644" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Product" DROP CONSTRAINT "FK_de75905c3b4987f4b5bb1472644"`,
    );
    await queryRunner.query(`DROP TABLE "Product"`);
  }
}
