import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEndereco1642606849092 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "endereco",
                columns: [
                    {
                        name: "client_id",
                        type: "uuid",
                        isNullable: true,
                    },
                    {
                        name: "rua",
                        type: "varchar"
                    },
                    {
                        name: "numero",
                        type: "varchar"
                    },
                    {
                        name: "bairro",
                        type: "varchar"
                    },
                    {
                        name: "cidade",
                        type: "varchar"
                    },
                    {
                        name: "cep",
                        type: "varchar"
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKClientAddress",
                        referencedTableName: "clients",
                        referencedColumnNames: ["id"],
                        columnNames: ["client_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("endereco")
    }

}

