<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    $product = Product::all();
    return response()->json([
    "success" => true,
    "message" => "Produto Listado",
    "data" => $product
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
    $validator = Validator::make($input, [
    'name'=> 'required',
    'code',
    'price'=> 'required',
    'detail' => 'required'
    ]);
    if($validator->fails()){
    return $this->sendError('Erro de validação.', $validator->errors());
    }
    $product = Product::create($input);
    return response()->json([
    "success" => true,
    "message" => "Produto cadastrado com sucesso.",
    "data" => $product
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
        $product = Product::find($id);
        if (is_null($product)) {
        return $this->sendError('Produto não encontrado.');
    }
         return response()->json([
            "success" => true,
            "message" => "Produto detalhado.",
            "data" => $product
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
        $input = $request->all();
        $validator = Validator::make($input, [
        'name' => 'required',
        'code',
        'price'=> 'required',
        'detail' => 'required'
        ]);
            if($validator->fails()){
                return $this->sendError('Erro na validação.', $validator->errors());
            }
            $product->name = $input['name'];
            $product->code = $input['code'];
            $product->price = $input['price'];
            $product->detail = $input['detail'];
            $product->save();
            return response()->json([
            "success" => true,
            "message" => "Produto atualzado com sucesso.",
            "data" => $product
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
        $product->delete();
        return response()->json([
        "success" => true,
        "message" => "Produto excluido com sucesso.",
        "data" => $product
    ]);
    }
}
