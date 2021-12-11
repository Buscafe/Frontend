<?php
defined('BASEPATH') OR exit('No direct script acess allowed');

//Função para trocar os caracteres ' (aspas simples) por ` (acento agudo) para podermos montar uma String
function troca_caractere($value){
    $retorno = str_replace("'", "`", $value);
    return $retorno;
}

?>