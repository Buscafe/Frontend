<?php
define('HOST', 'localhost'); #ip do banco
define('USUARIO', 'root'); #Usuario
define('SENHA', ''); #senha do banco
define('DB', 'login'); #Nome do banco

$conexao = mysqli_connect(HOST, USUARIO, SENHA, DB) or die ('Não foi possível conectar');

?>