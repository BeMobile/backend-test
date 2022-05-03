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
            $table->unsignedBigInteger('cliente_id');
            $table->unsignedBigInteger('produto_id');
            $table->integer('quantidade');
            $table->decimal('preco_unitario', 17,2);
            $table->decimal('preco_total', 17,2);
            $table->timestamps();
            //constraint
            $table->foreign('cliente_id')->references('id')->on('clientes')->onDelete(('cascade'));
            $table->foreign('produto_id')->references('id')->on('produtos')->onDelete(('cascade'));
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
