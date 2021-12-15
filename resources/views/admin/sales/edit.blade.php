@extends('layouts.app')

@section('content')
    <h1>Cadastrar Cliente</h1>
    <form action="{{route('admin.clients.update', ['client' => $client->id])}}" method="POST">
        @csrf
        @method("PUT")
        
        <div class="form-group">
            <label>Nome</label>
            <input type="text" name="name" class="form-control" value="{{$client->name}}">
        </div>
        <div class="form-group">
            <label>CPF</label>
            <input type="text" name="cpf" class="form-control" value="{{$client->cpf}}">
        </div>

        <div class="form-group">
            <label>DDD</label>
            <input type="text" name="ddd" class="form-control" value="{{$client->ddd}}">
        </div>

        <div class="form-group">
            <label>Telefone</label>
            <input type="text" name="phone" class="form-control" value="{{$client->phone}}">
        </div>

        <div class="form-group">
            <label>Endereço</label>
            <input type="text" name="address" class="form-control" value="{{$client->address}}">
        </div>

        <div class="form-group">
            <label>Número</label>
            <input type="text" name="numberHome" class="form-control" value="{{$client->numberHome}}">
        </div>

        <div class="form-group">
            <label>Bairro</label>
            <input type="text" name="district" class="form-control" value="{{$client->district}}">
        </div>

        <div class="form-group">
            <label>CEP</label>
            <input type="text" name="postal_code" class="form-control" value="{{$client->postal_code}}">
        </div>

        <div class="form-group">
            <label>Cidade</label>
            <input type="text" name="city" class="form-control" value="{{$client->city}}"
        </div>
        <div>
            <button type="submit" class="btn btn-lg btn-success">Atualizar</button>
        </div>
    </form>
@endsection