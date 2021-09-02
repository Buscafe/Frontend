<?php
session_start();
include('verifica_login.php');
?>

<h2><?php echo "Olá, ". $_SESSION['usuario']; ?></h2>
