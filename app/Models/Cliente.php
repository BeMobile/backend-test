<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use \App\Models\Telefone;
use \App\Models\Endereco;
use \App\Models\Venda;

class Cliente extends Model
{
    use HasFactory;

    protected $fillable =
    [        
        'nome',
        'cpf'
    ]; 

    public function telefones()
    {
        return $this->hasMany(Telefone::class, 'cliente_id');
    }

    public function enderecos()
    {
        return $this->hasMany(Endereco::class, 'cliente_id');
    }

    public function vendas()
    {
        return $this->hasMany(Venda::class, 'cliente_id');
    }
}
