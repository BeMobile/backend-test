<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Cliente;

class Venda extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'id_cliente',
        'id_produto',
        'quantidade',
        'preco_unitario',
        'preco_total',
        'status', //status da venda, como por exemplo, processando pagamento ou finalizado
        'created_at',
        'updated_at',
    ];


    public function cliente()
    {
        return $this->hasOne(Cliente::class, 'id_cliente');
    }

    public function produto()
    {
        return $this->hasOne(Produto::class, 'id_produto');
    }

}
