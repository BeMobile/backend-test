<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\User;

class UserController extends Controller
{

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function signup(Request $request)
    {
        $request->validate([
            'name' => 'required|min:3|max:100',
            'email' => 'required|unique:users|email|max:200',
            'login' => 'required|unique:users|min:3|max:50',
            'password' => 'required|min:8|max:32'
        ]); 
        
        $user = $this->user->create([
            'name' => $request->name,
            'email' => $request->email,
            'login' => $request->login,
            'password' => password_hash($request->password, PASSWORD_DEFAULT)
        ]);

        if ($user === null) :
            return response()->json(['error' => 'Erro ao tentar cadastrar Usuário!'], 404);
        else :
            return response()->json($user, 201);
        endif;
    }    
}
