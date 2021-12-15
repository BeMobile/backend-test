@extends('layouts.app')

@section('content')
<a href="{{route('admin.clients.create')}}" class="btn btn-lg btn-success">Adicionar Cliente</a>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>#</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>DDD</th>
                <th>Contato</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            @foreach($clients as $client)
                <tr>
                    <td>{{$client->id}}</td>
                    <td>{{$client->name}}</td>
                    <td>{{$client->cpf}}</td>
                    <td>{{$client->ddd}}</td>
                    <td>{{$client->phone}}</td>
                    <td>
                    <div class="btn-group">
                        <a href="{{route('admin.clients.edit', ['client' => $client->id])}}" class="btn btn-sm btn-primary">EDITAR</a>  
                        <form action="{{route('admin.clients.destroy', ['client' => $client->id])}}" method="POST">
                            @csrf
                            @method("DELETE")
                            <button type="submit" class="btn btn-sm btn-danger">REMOVER</button>
                        </form>
                    </div>  
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    {{$clients->links()}}
@endsection