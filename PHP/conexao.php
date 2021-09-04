<?php
define('HOST', 'remotemysql.com'); 
define('USUARIO', 'tc4icCf8rc'); 
define('SENHA', 'S1xbxi9Jjf'); 
define('DB', 'tc4icCf8rc'); 

$conexao = mysqli_connect(HOST, USUARIO, SENHA, DB) or die ('Não foi possível conectar');

?>