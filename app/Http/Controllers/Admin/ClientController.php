<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Client;

class ClientController extends Controller
{
    private $client;

    public function __construct(Client $client)
    {
        $this->client = $client;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $clients = \App\Client::paginate(10);

        // $clients = \App\Client::all(['id', 'name', 'cpf', 'ddd', 'phone']);

        //return $clients;

        return view('admin.clients.index', compact('clients'));
    
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.clients.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        $data = $request->all();
        $user = auth()->user();

        $client = \App\Client::create($data);

        flash('Cliente cadastrado com sucesso')->success();
        return redirect()->route('admin.clients.index');
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($clients)
    {
        $clients = $this->client->find($clients);
        //$products = \App\Product::orderBy('name', 'asc');

        return $clients;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($client)
    {
        $client = \App\Client::find($client);
        
        return view('admin.clients.edit', compact('client'));
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $client)
    {
        $data = $request->all();

        $client = \App\Client::find($client);
        $client->update($data);

        flash('Cadastro atualizado com sucesso')->success();
        return redirect()->route('admin.clients.index');
        //return $client
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($client)
    {
        $client = \App\Client::find($client);
        $client->delete();

        flash('Cadastro removido com sucesso')->success();
        return redirect()->route('admin.clients.index');
    }
}
