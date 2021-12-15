<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Client;
use Faker\Generator as Faker;

$factory->define(Client::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'cpf' => $faker->ipv4,
        'ddd' => $faker->numberBetween($min = 11, $max = 99),
        'phone' => $faker->phoneNumber,
        'address' => $faker->streetAddress,
        'numberHome' => $faker->buildingNumber,
        'district' =>$faker->streetName,
        'postal_code' =>$faker->postcode,
        'city' =>$faker->city,
    ];
});
