<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEnderecosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('enderecos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('cliente_id');
            $table->string('endereco', 200);
            $table->string('complemento', 200);
            $table->string('bairro', 100);
            $table->string('cidade', 50);
            $table->string('cep', 10);
            $table->string('estado', 2);
            $table->timestamps();
            //constraint
            $table->foreign('cliente_id')->references('id')->on('clientes')->onDelete(('cascade'));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('enderecos');
    }
}
