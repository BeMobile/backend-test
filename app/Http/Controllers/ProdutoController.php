<?php

namespace App\Http\Controllers;

use App\Models\Produto;
use App\Http\Requests\StoreProdutoRequest;
use App\Http\Requests\UpdateProdutoRequest;

class ProdutoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $produtos = Produto::orderBy('titulo')->get(['titulo', 'categoria', 'preco']);
        return response()->json($produtos);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreProdutoRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProdutoRequest $request)
    {
        // criação através de Eloquent
        try{
            $insercao = Produto::create([
                'titulo' => $request->titulo,
                'descricao'=> $request->descricao,
                'categoria'=> $request->categoria,
                'link_capa' => $request->link_capa,
                'codigo' => $request->codigo,
                'preco' => $request->preco,
            ]);

            return response()->json(['response' => 'Produto inserido com sucesso']);

        } catch (Exception $e){
            return response()->json(['response' => 'Erro ao inserir o produto.']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Produto  $produto
     * @return \Illuminate\Http\Response
     */
    public function show(Produto $produto)
    {
        $produto = Produto::find($produto->id);

        if ($produto != null){
            return response()->json([$produto]);
        } else {
            return response()->json(['Produto não encontrado.']);
        }

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateProdutoRequest  $request
     * @param  \App\Models\Produto  $produto
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProdutoRequest $request, Produto $produto)
    {
        try{
            Produto::where(['id'=>$produto->id])
                ->update([
                'titulo' => $request->titulo,
                'descricao'=> $request->descricao,
                'categoria'=> $request->categoria,
                'link_capa'=> $request->link_capa,
                'codigo' => $request->codigo,
                'preco' => $request->preco,
            ]);

            return response()->json(['Produto atualizado com sucesso']);
        } catch (\Exception $e){
            return response()->json(['Erro ao atualizar o produto.']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Produto  $produto
     * @return \Illuminate\Http\Response
     */
    public function destroy(Produto $produto)
    {
        Produto::find($produto->id)->delete();
    }

    public function restore($produto)
    {
        $produto = Produto::onlyThrashed()->where([
            'id' => $produto
        ]);
        // Restaure o post
        $produto->restore();
    }
}
