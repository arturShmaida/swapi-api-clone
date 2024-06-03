import { DatabaseSeederService } from "db/database-seeder";
import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedDatabase1717244336803 implements MigrationInterface {
    name: "SeedDatabase1717244336803";
    public async up(queryRunner: QueryRunner): Promise<void> {
        let seeder = new DatabaseSeederService(queryRunner);
         await seeder.seedDatabase()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        console.log("Does nothing")
    }

}
