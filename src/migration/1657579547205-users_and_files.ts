import { MigrationInterface, QueryRunner } from "typeorm";

export class usersAndFiles1657579547205 implements MigrationInterface {
    name = 'usersAndFiles1657579547205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`users\` (
                \`user_id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`email\` varchar(255) NOT NULL,
                \`password\` varchar(255) NOT NULL,
                \`surname\` varchar(255) NULL,
                \`gender\` tinyint NULL,
                \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`),
                PRIMARY KEY (\`user_id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`files\` (
                \`file_name\` varchar(36) NOT NULL,
                \`extension\` varchar(255) NOT NULL,
                \`user_id\` int NULL,
                PRIMARY KEY (\`file_name\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`files\`
            ADD CONSTRAINT \`FK_a7435dbb7583938d5e7d1376041\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`files\` DROP FOREIGN KEY \`FK_a7435dbb7583938d5e7d1376041\`
        `);
        await queryRunner.query(`
            DROP TABLE \`files\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\`
        `);
        await queryRunner.query(`
            DROP TABLE \`users\`
        `);
    }

}
