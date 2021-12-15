<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Product extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name_product', 'buy_price', 'sale_price', 'quantity',
    ];

    public function clients()
    {
        return $this->belongsToMany(Client::class, 'sales');
    }
}
