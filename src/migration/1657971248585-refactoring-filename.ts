import { MigrationInterface, QueryRunner } from "typeorm";

export class refactoringFilename1657971248585 implements MigrationInterface {
    name = 'refactoringFilename1657971248585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`files\`
            CHANGE \`file_name\` \`filename\` varchar(36) NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`files\`
            CHANGE \`filename\` \`file_name\` varchar(36) NOT NULL
        `);
    }

}
