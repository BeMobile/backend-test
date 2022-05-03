<?php

namespace App\Http\Controllers;

use App\Models\Produto;
use Illuminate\Http\Request;

class ProdutoController extends Controller
{
    
    public function __construct(Produto $produto)
    {
        $this->produto = $produto;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {             
        // $produto = $this->produto
        // ->orderBy('nome', 'ASC')
        // ->get(); 

        $produto = $this->produto
        ->withTrashed() // Mostra produtos excluídos (Soft Delete)
        ->orderBy('nome', 'ASC')
        ->get();
       
        if ($produto === null) :
            return response()->json(['error' => 'Erro ao tentar Listar Produtos!'], 404);
        else :
            return response()->json($produto, 200);
        endif;
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
            'isbn' => 'required|unique:produtos|isbn|integer',
            'nome' => 'required|min:3|max:200',
            'autor' => 'required|min:3|max:200',
            'editora' => 'required|min:3|max:100',
            'preco' => 'required'
        ]); 

        $produto = $this->produto->create([
            'isbn' => $request->isbn,
            'nome' => $request->nome,
            'autor' => $request->autor,
            'editora' => $request->editora,
            'preco' => $request->preco
        ]);

        if ($produto === null) :
            return response()->json(['error' => 'Erro ao tentar cadastrar Produto!'], 404);
        else :
            return response()->json($produto, 200);
        endif;
    }

    /**
     * Display the specified resource.
     *
     * @param Integer
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $produto = $this->produto->find($id);
        if ($produto === null):
         return response()->json(['error' => 'Erro ao tentar visualizar Produto!'], 404);
        else: 
        return response()->json($produto, 200);
        endif;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Produto  $produto
     * @param Integer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'isbn' => 'required|integer',
            'nome' => 'required|min:3|max:200',
            'autor' => 'required|min:3|max:200',
            'editora' => 'required|min:3|max:100',
            'preco' => 'required'
        ]); 
        $produto = $this->produto->find($id);
        if ($produto === null) :
            return response()->json(['erro' => 'Erro a tentar atualizar Produto!'], 404);
        else :
            $produto->isbn = $request->isbn;
            $produto->nome = $request->nome;
            $produto->autor = $request->autor;
            $produto->editora = $request->editora;
            $produto->preco = $request->preco;
            $produto->update();
            return response()->json($produto, 200);
        endif;
    }

    /**
     * Remove the specified resource from storage.
     *
     *  @param Integer
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $produto = $this->produto->find($id);
        if ($produto === null) :
            return response()->json(['error' => 'Erro ao tentar deletar Produto!'], 404);
        else :
            $produto->delete();
            return response()->json(['message' => 'Produto deletado com Successo!'], 200);
        endif;
    }
}
