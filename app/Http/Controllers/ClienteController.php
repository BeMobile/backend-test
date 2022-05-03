<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;

class ClienteController extends Controller
{

    public function __construct(Cliente $cliente)
    {
        $this->cliente = $cliente;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $cliente = $this->cliente
            ->with('enderecos')
            ->with('telefones')
            ->orderBy('clientes.id', 'ASC')
            ->get();

        if ($cliente === null) :
            return response()->json(['error' => 'Erro ao tentar Listar Clientes!'], 404);
        else :
            return response()->json($cliente, 200);
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
            'nome' => 'required|min:3|max:100',
            'cpf' => 'required|unique:clientes|min:14|max:14'
        ]);

        $cliente = $this->cliente->create([
            'nome' => $request->nome,
            'cpf' => $request->cpf
        ]);

        if ($cliente === null) :
            return response()->json(['error' => 'Erro ao tentar cadastrar Cliente!'], 404);
        else :
            return response()->json($cliente, 200);
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
        // $cliente = $this->cliente->find($id); Somente detalhar o cliente sem as vendas associadas a ele
        $cliente = $this->cliente->find($id)
            ->with('vendas')
            ->get();
            

        if ($cliente === null) :
            return response()->json(['error' => 'Erro ao tentar visualizar Cliente!'], 404);
        else :
            return response()->json($cliente, 200);
        endif;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Cliente  $cliente
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'nome' => 'required|min:3|max:100',
            'cpf' => 'required|min:14|max:14',
        ]);
        $cliente = $this->cliente->find($id);
        if ($cliente === null) :
            return response()->json(['erro' => 'Erro a tentar atualizar Cliente!'], 404);
        else :
            $cliente->nome = $request->nome;
            $cliente->cpf = $request->cpf;
            $cliente->update();
            return response()->json($cliente, 200);
        endif;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Integer
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $cliente = $this->cliente->find($id);
        if ($cliente === null) :
            return response()->json(['error' => 'Erro ao tentar deletar Cliente!'], 404);
        else :
            $cliente->delete();
            return response()->json(['message' => 'Cliente deletado com Successo!'], 200);
        endif;
    }
}
