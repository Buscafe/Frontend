<?php
define('HOST', 'buscafe-sever.mysql.database.azure.com'); #SEVER
define('USUARIO', 'buscafeADM@buscafe-sever'); #USERNAME
define('SENHA', 'SDCbuscafe240621'); #PASSWORD
define('DB', 'login'); #DATABASE NAME

$conexao = mysqli_connect(HOST, USUARIO, SENHA, DB) or die ('Não foi possível conectar');

/*
    =========== DATABASE 1 ============
    Username: tc4icCf8rc
    Database name: tc4icCf8rc
    Password: S1xbxi9Jjf
    Server: remotemysql.com
    Port: 3306
    =========== DATABASE 2 ============
    Username: sql10435079
    Database name: sql10435079
    Database password: avKxLxLxDY
    Sever: sql10.freesqldatabase.com
    Port : 3306
    ===================================
    define('HOST', 'b2v61ynpmgla8ebsptdy-mysql.services.clever-cloud.com'); #SEVER
    define('USUARIO', 'ugmbuylznvbkefpl'); #USERNAME
    define('SENHA', 'vKF69URcVuvGnTBLMZwc'); #PASSWORD
    define('DB', 'b2v61ynpmgla8ebsptdy'); #DATABASE NAME

*/
?>
