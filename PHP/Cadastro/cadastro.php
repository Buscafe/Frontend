<?php
session_start();
include('../conexao.php');

// Pegando os valores de usuario, email e senha
$usuario = mysqli_real_escape_string($conexao, trim($_POST['user_c']));
$email = mysqli_real_escape_string($conexao, trim($_POST['email_c']));
$senha = mysqli_real_escape_string($conexao, trim(md5($_POST['senha_c'])));

//Verificando se os campos não estão em branco
if(empty($usuario) || empty($email) || empty($senha)){
    $_SESSION['dados_em_branco'] = true;
    header('Location: ../Login/index.php');
    exit();
}

// Verificando se o usuário já existe
$sql = "SELECT COUNT(*) AS total FROM usuario WHERE email = '$email'";
$result = mysqli_query($conexao, $sql);
$row = mysqli_fetch_assoc($result);

if($row['total'] == 1){
    $_SESSION['email_existe'] = true;
    header('Location: ../Login/index.php');
}

// Cadastro em si
$sql = "INSERT INTO usuario(nome_usuario, email, senha, data_cadastro) VALUES ('{$usuario}', '{$email}', '{$senha}', NOW())";

if($conexao -> query($sql) === TRUE){
    $_SESSION['status_cadastro'] = true;
}

$conexao->close();

header('Location: ../Login/index.php');
exit;
