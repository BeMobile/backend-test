<?php

namespace App\Models;

use App\Models\Endereco;
use App\Models\Venda;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'cpf',
        'nome',
        'telefone',
        'cep',
        'rua',
        'numero',
        'complemento',
        'bairro',
        'cidade',
        'estado',
        'created_at',
        'updated_at',
    ];

    public function compras(){
        return $this->hasMany(Venda::class,'id_cliente','id');
    }

}
