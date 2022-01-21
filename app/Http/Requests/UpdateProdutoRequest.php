<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProdutoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'titulo' => 'required',
            'descricao' => 'required|max:250',
            'categoria' => 'required|max:50',
            'link_capa' => 'url',
            'codigo' => 'max:25',
            'preco' => 'numeric',
        ];
    }
}
