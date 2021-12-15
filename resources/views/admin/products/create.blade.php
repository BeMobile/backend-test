@extends('layouts.app')

@section('content')
    
    <h1>Cadastrar Produto</h1>
    <form action="{{route('admin.products.store')}}" method="POST">
        @csrf
        
        <div class="form-group">
            <label>Produto</label>
            <input type="text" name="name_product" class="form-control">
        </div>
        <div class="form-group">
            <label>Preço de compra</label>
            <input type="text" name="buy_price" class="form-control">
        </div>

        <div class="form-group">
            <label>Preço de venda</label>
            <input type="text" name="sale_price" class="form-control">
        </div>

        <div class="form-group">
            <label>Quantidade</label>
            <input type="text" name="quantity" class="form-control">
        </div>

        
        <div>
            <button type="submit" class="btn btn-lg btn-success">Salvar</button>
        </div>
    </form>

@endsection