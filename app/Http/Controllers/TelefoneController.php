<?php

namespace App\Http\Controllers;

use App\Models\Telefone;
use Illuminate\Http\Request;

class TelefoneController extends Controller
{
    
    public function __construct(Telefone $telefone)
    {
        $this->telefone = $telefone;
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
            'cliente_id' => 'required',
            'numero' => 'required|min:14|max:14'
        ]); 

        $telefone = $this->telefone->create([
            'cliente_id' => $request->cliente_id,
            'numero' => $request->numero
        ]);

        if ($telefone === null) :
            return response()->json(['error' => 'Erro ao tentar cadastrar Telefone do Cliente!'], 404);
        else :
            return response()->json($telefone, 200);
        endif;
    }
    
    /**
     * Update the specified resource in storage.
     * @param Integer
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'cliente_id' => 'required',
            'numero' => 'required|min:14|max:14'
        ]); 
        $telefone = $this->telefone->find($id);
        if ($telefone === null) :
            return response()->json(['erro' => 'Erro a tentar atualizar Telefone do Cliente!'], 404);
        else :
            $telefone->cliente_id = $request->cliente_id;
            $telefone->numero = $request->numero;
            $telefone->update();
            return response()->json($telefone, 200);
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
        $telefone = $this->telefone->find($id);
        if ($telefone === null) :
            return response()->json(['error' => 'Erro ao tentar deletar Telefone do Cliente!'], 404);
        else :
            $telefone->delete();
            return response()->json(['message' => 'Telefone do Cliente deletado com Successo!'], 200);
        endif;
    }
}
