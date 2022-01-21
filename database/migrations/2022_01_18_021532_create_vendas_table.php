<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVendasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vendas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_cliente');
            $table->foreignId('id_produto');
            $table->integer('quantidade')->default(1);
            $table->decimal('preco_unitario');
            $table->decimal('preco_total',10,2);
            $table->string('status')->default('finalizado'); //pode ser definido um status de venda, como processando venda, no caminho, finalizado, etc
            $table->timestamps();

            $table->foreign("id_cliente")->references("id")->on("clientes")->onDelete("CASCADE")->onUpdate("CASCADE");
            $table->foreign("id_produto")->references("id")->on("produtos")->onUpdate("CASCADE");

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vendas');
    }
}
