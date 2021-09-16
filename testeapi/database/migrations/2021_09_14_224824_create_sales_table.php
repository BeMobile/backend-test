<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->double('total', 10.2);
            $table->foreignId('fk_clients')->unsigned();
            $table->foreignId('fk_products')->unsigned();

            $table->timestamps();
            $table->foreign('fk_products')->references('id')->on('products');
            $table->foreign('fk_clients')->references('id')->on('clients');

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
        Schema::dropIfExists('sales');
    }
}
