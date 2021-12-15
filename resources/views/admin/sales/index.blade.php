@extends('layouts.app')

@section('content')
<a href="{{route('admin.sales.create')}}" class="btn btn-lg btn-success">Adicionar Cliente</a>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Produto</th>
                
            </tr>
        </thead>
        <tbody>
            @foreach($sales as $sale)
                <tr>
                    <td>{{$sale->id}}</td>
                    <td>{{$sale->client->name}}</td>
                    <td>{{$sale->product->name}}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    
@endsection