<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Http\Requests\StoreClienteRequest;
use App\Http\Requests\UpdateClienteRequest;
use Illuminate\Http\Request;

class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $clientes = Cliente::orderBy('id')->get(['nome','telefone']);
        return response()->json($clientes);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreClienteRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreClienteRequest $request)
    {
        // criação através de Eloquent
        try{
            $insercao = Cliente::create([
                'cpf' => $request->cpf,
                'nome'=> $request->nome,
                'telefone'=> $request->telefone,
                'cep' => $request->cep,
                'rua' => $request->rua,
                'numero' => $request->numero,
                'complemento' => $request->complemento,
                'bairro' => $request->bairro,
                'cidade' => $request->cidade,
                'estado' => $request->estado,
            ]);

            return response()->json(['response' => 'Inserido com sucesso']);

        } catch (Exception $e){
            return response()->json(['response' => 'Erro ao inserir']);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Cliente  $cliente
     * @return \Illuminate\Http\Response
     */
    public function show(Cliente $cliente)
    {
        $cliente = Cliente::find($cliente->id);
        $vendas = $cliente->compras()->orderby('created_at')->get();

        return response()->json([$cliente, $vendas]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateClienteRequest  $request
     * @param  \App\Models\Cliente  $cliente
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateClienteRequest $request, Cliente $cliente)
    {

        try{
            Cliente::where(['id'=>$cliente->id])->update([
                'cpf' => $request->cpf,
                'nome'=> $request->nome,
                'telefone'=> $request->telefone,
                'cep'=> $request->cep,
                'rua' => $request->rua,
                'numero' => $request->numero,
                'complemento' => $request->complemento,
                'bairro' => $request->bairro,
                'cidade' => $request->cidade,
                'estado' => $request->estado,
            ]);

            return response()->json(['response' => 'Atualizado com sucesso']);
        } catch (\Exception $e){
            return response()->json(['response' => 'Erro ao atualizar.']);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Cliente  $cliente
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cliente $cliente)
    {
        try{
            Cliente::where(['id'=>$cliente->id])->delete();

            return response()->json(['response' => 'Deletado com sucesso.']);
        } catch (\Exception $e){
            return response()->json(['response' => 'Erro ao deletar.']);
        }
    }
}
