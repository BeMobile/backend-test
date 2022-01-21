<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Produto extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $dates = ['deleted_at'];

    protected $fillable = [
        'id',
        'titulo',
        'descricao',
        'categoria',
        'link_capa', //link externo para imagem do produto
        'codigo',
        'preco',
        'created_at',
        'updated_at',
    ];



}
