<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $table = 'clients';
    protected $primarykey = 'id';

    protected $fillable = [
        'name',
        'cpf',


    ];
public function address(){

return $this->hasOne(related: Address::class, foreignKey:'id_client', localKey:'id');
}

public function product(){
    return $this->hasOne(related:Sale::class, foreignKey:'id_cleint', localKey:'id');
}
}
