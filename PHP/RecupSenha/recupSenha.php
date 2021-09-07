<?php
session_start();
include('../conexao.php');

// Validando se os campos foram preenchidos corretamente
if( empty($_POST['email']) || empty($_POST['novaSenha']) || empty($_POST['novaSenhaConfirm']) ){
    $_SESSION['empty'] = true;
    header('Location: index.php');
    exit();
}

// Salvando os dados do form
$email = mysqli_real_escape_string($conexao, $_POST['email']);
$senha = mysqli_real_escape_string($conexao, $_POST['novaSenha']);
$confirmSenha = mysqli_real_escape_string($conexao, $_POST['novaSenhaConfirm']);

if ($senha == $confirmSenha){
    $_SESSION['recup_senha'] = true;
    $query = "UPDATE usuario SET senha = md5('$senha') WHERE email = '$email'";
    $result = mysqli_query($conexao, $query);

    header('Location: ../Login/index.php');
    exit();
} else {
    $_SESSION['erro_senha'] = true;
    header('Location: index.php');
}

?>