import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSale1642779496983 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "sales",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "id_client",
                        type: "varchar",
                    },
                    {
                        name: "id_product",
                        type: "varchar",
                    },
                    {
                        name: "quantity",
                        type: "integer",
                    },
                    {
                        name: "total_price",
                        type: "numeric",
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("sales")
    }

}
