@extends('layouts.app')

@section('content')
<a href="{{route('admin.products.create')}}" class="btn btn-lg btn-success">Adicionar Produto</a>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>#</th>
                <th>Produto</th>
                <th>Preço</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            @foreach($products as $product)
                <tr>
                    <td>{{$product->id}}</td>
                    <td>{{$product->name_product}}</td>
                    <td>R$ {{number_format($product->sale_price, 2, ',', '.')}}</td>
                    
                    <td>
                        <div class="btn-group">
                            <a href="{{route('admin.products.edit', ['product' => $product->id])}}" class="btn btn-sm btn-primary">EDITAR</a>
                            <form action="{{route('admin.products.destroy', ['product' => $product->id])}}" method="POST">
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

    {{$products->links()}}
@endsection