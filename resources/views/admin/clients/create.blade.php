@extends('layouts.app')

@section('content')
    
    <h1>Cadastrar Cliente</h1>
    <form action="{{route('admin.clients.store')}}" method="POST">
        <input type="hidden" name="_token" value="{{csrf_token()}}">
        <div class="form-group">
            <label>Nome</label>
            <input type="text" name="name" class="form-control">
        </div>
        <div class="form-group">
            <label>CPF</label>
            <input type="text" name="cpf" class="form-control">
        </div>

        <div class="form-group">
            <label>DDD</label>
            <input type="text" name="ddd" class="form-control">
        </div>

        <div class="form-group">
            <label>Telefone</label>
            <input type="text" name="phone" class="form-control">
        </div>

        <div class="form-group">
            <label>Endereço</label>
            <input type="text" name="address" class="form-control">
        </div>

        <div class="form-group">
            <label>Número</label>
            <input type="text" name="numberHome" class="form-control">
        </div>

        <div class="form-group">
            <label>Bairro</label>
            <input type="text" name="district" class="form-control">
        </div>

        <div class="form-group">
            <label>CEP</label>
            <input type="text" name="postal_code" class="form-control">
        </div>

        <div class="form-group">
            <label>Cidade</label>
            <input type="text" name="city" class="form-control">
        </div>
        <div>
            <button type="submit" class="btn btn-lg btn-success">Salvar</button>
        </div>
    </form>

@endsection