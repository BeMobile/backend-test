<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Sale;

class SaleController extends Controller
{
    private $sale;

    public function __construct(Sale $sale)
    {
        $this->sale = $sale;
    }

    public function index()
    {
      $sales = \App\Sale::join('clients', 'clients.id', '=', 'sales.client_id')
        ->join('products', 'products.id', '=', 'sales.product_id')
        ->get();

      return $sales;
    
    }

    public function store(Request $request)
    {
        //$data = $request->all();

        //$client = \App\Client::find($data['client']);
        //$client->products()->create($data);

        //$product = \App\Product::create($data);

        //flash('Produto Criado com Sucesso!')->success();
        //return redirect()->route('admin.products.index');
    }
}
