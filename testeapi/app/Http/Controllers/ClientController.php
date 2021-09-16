<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Address;
use App\Models\Sale;
use Illuminate\Http\Request;


class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $clients = Client::all();
        return response()->json([
        "success" => true,
        "message" => "Cliente Listado",
        "data" => $clients
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();

        $client = Client::create($input);
        return response()->json([
        "success" => true,
        "message" => "Cliente Cadastrado com sucesso.",
        "data" => $client
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $client = Client::first($id);
        return response()->json([
        "success" => true,
        "message" => "Detalhes do cliente.",
        "data" => $client
        ]);



    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if($validator->fails()){
            return $this->sendError('Erro na validação.', $validator->errors());
            }
            $client->name = $input['name'];
            $client->cpf =  $input['cpf'];
            $client->save();
            return response()->json([
            "success" => true,
            "message" => "Cliente atualizado com sucesso.",
            "data" => $client
            ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
       $client = Client::find($id)->delete();
        return response()->json([
        "success" => true,
        "message" => "Cliente excluido com sucesso.",
        "data" => $client
]);
    }


}
