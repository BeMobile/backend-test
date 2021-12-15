<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    protected $fillable = [
        'client_id', 'product_id', 'qt_sale',
    ];

    public function products()
    {
        return $this->hasOne(Product::class, 'sales');
    }

    public function clients()
    {
        return $this->hasOne(Client::class, 'sales');
    }
}
