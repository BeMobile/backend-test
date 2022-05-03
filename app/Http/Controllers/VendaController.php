<?php

namespace App\Http\Controllers;

use App\Models\Produto;
use App\Models\Venda;
use Illuminate\Http\Request;

class VendaController extends Controller
{
    
    public function __construct(Venda $venda)
    {
        $this->venda = $venda;
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'cliente_id' => 'required|integer',
            'produto_id' => 'required|integer',
            'quantidade' => 'required|integer'
        ]); 

        $produto = Produto::find($request->produto_id);
        $valorTotal = $request->quantidade * $produto->preco;

        $venda = $this->venda->create([            
            'cliente_id' => $request->cliente_id,
            'produto_id' => $request->produto_id,
            'quantidade' => $request->quantidade,
            'preco_unitario' => $produto->preco,
            'preco_total' => $valorTotal
        ]);

        if ($venda === null) :
            return response()->json(['error' => 'Erro ao tentar cadastrar Venda do Cliente!'], 404);
        else :
            return response()->json($venda, 200);
        endif;
    }   
}
