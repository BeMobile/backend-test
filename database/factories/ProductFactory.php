<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Product;
use Faker\Generator as Faker;

$factory->define(Product::class, function (Faker $faker) {
    return [
        'name_product' => $faker->name,
        'buy_price' =>$faker->randomFloat(2, 10, 100),
        'sale_price' =>$faker->randomFloat(2, 10, 200),
        'quantity' =>$faker->numberBetween($min = 30, $max = 200)
    ];
});
