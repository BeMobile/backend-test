<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAddressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->string('cidade', 30);
            $table->string('uf', 2);
            $table->string('cep', 8);
            $table->string('bairro', 100);
            $table->string('rua', 100);
            $table->string('nomero', 10);
            $table->foreignId('fk_client')->unsigned();
            $table->timestamps();

            $table->foreign('fk_client')->references('id')->on('clients');
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('addresses');
    }
}
