import { POSSIBLE_PERIODS, Period } from "$lib/typeorm/entities/Period";
import { type MigrationInterface, type QueryRunner } from "typeorm";

const initColumn = "period" satisfies keyof Period;

export class SeedPeriodData0000000000001 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Populate database with goal categories
        await queryRunner.query(`
            INSERT INTO ${Period.table_name} (${initColumn})
            VALUES ${POSSIBLE_PERIODS.map(period => `('${period}')`).join(', ')}
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove goal categories from database
        await queryRunner.query(`
            DELETE FROM ${Period.table_name}
            WHERE ${initColumn} IN (${POSSIBLE_PERIODS.map(period => `'${period}'`).join(', ')})
        `);
    }
}