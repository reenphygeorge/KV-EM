import { MigrationInterface, QueryRunner } from "typeorm";

export class JoinDateAdded1721117467144 implements MigrationInterface {
    name = 'JoinDateAdded1721117467144'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "join_date" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "join_date"`);
    }

}
