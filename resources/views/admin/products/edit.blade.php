@extends('layouts.app')

@section('content')
    <h1>Cadastrar Produto</h1>
    <form action="{{route('admin.products.update', ['product' => $product->id])}}" method="POST">
        @csrf
        @method("PUT")
        
        <div class="form-group">
            <label>Produto</label>
            <input type="text" name="name_product" class="form-control" value="{{$product->name}}">
        </div>
        <div class="form-group">
            <label>Preço de Compra</label>
            <input type="text" name="buy_price" class="form-control" value="{{$product->buy_price}}">
        </div>

        <div class="form-group">
            <label>Preço de Venda</label>
            <input type="text" name="sale_price" class="form-control" value="{{$product->sale_price}}">
        </div>

        <div class="form-group">
            <label>Quantidade</label>
            <input type="text" name="quantity" class="form-control" value="{{$product->quantity}}">
        </div>
        <div>
            <button type="submit" class="btn btn-lg btn-success">Atualizar</button>
        </div>
    </form>
@endsection