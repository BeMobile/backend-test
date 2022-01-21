<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateClienteRequest extends FormRequest
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
            'cpf' => 'min:11|max:12',
            'telefone' => '|max:25',
            'cep' => 'required',
            'rua' => 'required',
            'numero' => 'required|integer',
            'complemento' => '',
            'bairro' => 'required',
            'cidade' => 'required',
            'estado' => 'required',
            //
        ];
    }
}
