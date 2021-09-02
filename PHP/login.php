<?php
session_start();
include('conexao.php');

// Validando se os campos foram preenchidos corretamente
if( empty($_POST['usuario']) || empty($_POST['senha']) ){
    header('Location: index.php');
    exit();
}

// Pegando os valores de usuario e senha
$usuario = mysqli_real_escape_string($conexao, $_POST['usuario']);
$senha = mysqli_real_escape_string($conexao, $_POST['senha']);

// Fazendo a query para o banco
$query = "SELECT usuario_id, usuario FROM usuario WHERE usuario = '{$usuario}' AND senha = md5('$senha')";

// Rodando a query no banco($conexao)
$result = mysqli_query($conexao, $query);

// Vendo quantas linhas foram retornadas
$row = mysqli_num_rows($result);

// Se retornar 1 linh a query achou, se não deu erro
if($row == 1){
    $_SESSION['usuario'] = $usuario;
    header('Location: painel.php');
    exit();
} else{
    header('Location: index.php');
    exit();
} 
?>