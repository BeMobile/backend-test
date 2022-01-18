import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateClient1642445117924 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "clients",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "nome",
                        type: "varchar",
                    },
                    {
                        name: "cpf",
                        type: "varchar"
                    },
                    {
                        name: "telefone",
                        type: "varchar"
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
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("clients")
    }

}
