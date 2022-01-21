<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProdutosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('produtos', function (Blueprint $table) {
            $table->id();
            $table->string("titulo")->nullable();
            $table->string("descricao")->nullable();
            $table->string('categoria')->nullable();
            $table->string('link_capa')->nullable(); //link para a imagem de capa do produto
            $table->integer("codigo")->nullable()->unique(); // pode ate ser null, mas tem que ser unico
            $table->decimal("preco", 10, 2)->default(0);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('produtos');
    }
}
