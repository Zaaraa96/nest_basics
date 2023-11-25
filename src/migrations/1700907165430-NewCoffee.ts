import { MigrationInterface, QueryRunner } from "typeorm";

export class NewCoffee1700907165430 implements MigrationInterface {
    name = 'NewCoffee1700907165430'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" ADD "description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "description"`);
    }

}
