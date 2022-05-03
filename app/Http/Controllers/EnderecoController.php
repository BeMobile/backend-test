<?php

namespace App\Http\Controllers;

use App\Models\Endereco;
use Illuminate\Http\Request;

class EnderecoController extends Controller
{

    public function __construct(Endereco $endereco)
    {
        $this->endereco = $endereco;
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
            'endereco' => 'required|min:3|max:200',
            'complemento' => 'required|min:3|max:200',
            'bairro' => 'required|min:3|max:100',
            'cidade' => 'required|min:3|max:50',
            'cep' => 'required|min:10|max:10',
            'estado' => 'required|min:2|max:2'
        ]); 

        $endereco = $this->endereco->create([
            'cliente_id' => $request->cliente_id,
            'endereco' => $request->endereco,
            'complemento' => $request->complemento,
            'bairro' => $request->bairro,
            'cidade' => $request->cidade,
            'cep' => $request->cep,
            'estado' => $request->estado
        ]);

        if ($endereco === null) :
            return response()->json(['error' => 'Erro ao tentar cadastrar Endereço do Cliente!'], 404);
        else :
            return response()->json($endereco, 200);
        endif;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param Integer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'cliente_id' => 'required|integer',
            'endereco' => 'required|min:3|max:200',
            'complemento' => 'required|min:3|max:200',
            'bairro' => 'required|min:3|max:100',
            'cidade' => 'required|min:3|max:50',
            'cep' => 'required|min:10|max:10',
            'estado' => 'required|min:2|max:2'
        ]); 
        $endereco = $this->endereco->find($id);
        if ($endereco === null) :
            return response()->json(['erro' => 'Erro a tentar atualizar Endereço do Cliente!'], 404);
        else :
            $endereco->cliente_id = $request->cliente_id;
            $endereco->endereco = $request->endereco;
            $endereco->complemento = $request->complemento;
            $endereco->bairro = $request->bairro;
            $endereco->cidade = $request->cidade;
            $endereco->cep = $request->cep;
            $endereco->estado = $request->estado;
            $endereco->update();
            return response()->json($endereco, 200);
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
        $endereco = $this->endereco->find($id);
        if ($endereco === null) :
            return response()->json(['error' => 'Erro ao tentar deletar Endereço do Cliente!'], 404);
        else :
            $endereco->delete();
            return response()->json(['message' => 'Endereço do Cliente deletado com Successo!'], 200);
        endif;
    }
}
