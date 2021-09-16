<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $table = 'adress';
    protected $primarykey = 'id';

    protected $with = ['client'];

    protected $fillable = [
        'fk_client',
        'cidade',
        'uf',
        'cep',
        'bairro',
        'rua',
        'numero',
        'telefone'
    ];

    public function client(){
        return $this->belongsTo(Client::class, 'fk_client', 'id');
    }
}
