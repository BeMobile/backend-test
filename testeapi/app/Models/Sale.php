<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    protected $table = 'sales';
    protected $primarykey = 'id';

    protected $with = ['client', 'product'];

    protected $filabe = [
        'total',
        'fk_clients',
        'fk_products'

    ];

    public function client(){
        return $this->belongsTo(Client::class, 'fk_clients', 'id');
    }

    public function product(){
        return $this->belongsTo(Product::class, 'fk_products', 'id');
    }
}
