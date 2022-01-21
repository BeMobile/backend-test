import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProducts1642773292840 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "products",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "nome_livro",
                        type: "varchar"
                    },
                    {
                        name: "autor_livro",
                        type: "varchar"
                    },
                    {
                        name: "ano_livro",
                        type: "varchar"
                    },
                    {
                        name: "genero_livro",
                        type: "varchar"
                    },
                    {
                        name: "editora_livro",
                        type: "varchar"
                    },
                    {
                        name: "paginas_livro",
                        type: "varchar"
                    },
                    {
                        name: "preco",
                        type: "numeric"
                    },
                    {
                        name: "deleted",
                        type: "boolean",
                        default: false
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("products")
    }

}
