<?php
session_start();
include('../conexao.php');

// Validando se os campos foram preenchidos corretamente
if( empty($_POST['recupUsuario']) || empty($_POST['novaSenha']) || empty($_POST['novaSenhaConfirm']) ){
    header('Location: index.php');
    exit();
}

$usuario = mysqli_real_escape_string($conexao, $_POST['recupUsuario']);
$senha = mysqli_real_escape_string($conexao, $_POST['novaSenha']);
$confirmSenha = mysqli_real_escape_string($conexao, $_POST['novaSenhaConfirm']);

if ($senha == $confirmSenha){
    $query = "UPDATE usuario SET senha = md5('$senha') WHERE nome_usuario = '$usuario'";
    $result = mysqli_query($conexao, $query);

    header('Location: ../Login/index.php');
    exit();
} else {
    $_SESSION['erro_senha'] = true;
    header('Location: index.php');
    exit();
}

?>