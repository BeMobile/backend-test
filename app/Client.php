<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = [
        'name', 'cpf', 'ddd', 'phone', 'address', 'numberHome', 'district', 'postal_code', 'city',
    ];


    public function products()
    {
        return $this->belongsToMany(Product::class, 'sales');
    }
}
