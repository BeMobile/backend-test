<?php

namespace App\Http\Controllers;

use App\Models\Produto;
use App\Models\Venda;
use App\Http\Requests\StoreVendaRequest;
use App\Http\Requests\UpdateVendaRequest;

class VendaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $vendas = Venda::all();
        return response()->json([$vendas]);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreVendaRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreVendaRequest $request)
    {
        // criação através de Eloquent
        $produto = Produto::find($request->id_produto);

        if ($produto != null){
            try{
                $valorTotal = $request->quantidade * $produto->preco;

                $insercao = Venda::create([
                    'id_cliente' => $request->id_cliente,
                    'id_produto'=> $produto->id,
                    'quantidade'=> $request->quantidade,
                    'preco_total' => $valorTotal,
                    'preco_unitario' => $produto->preco ,
                ]);

                return response()->json(['Venda inserida com sucesso.']);

            } catch (Exception $e){
                return response()->json(['Erro ao inserir a venda.']);
            }
        } else {
            return response()->json(['Houve algum erro com o produto.']);
        }


    }

}
