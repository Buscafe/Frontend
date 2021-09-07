<?php
session_start();
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Buscafé - Recuperar Senha</title>
    <!-- Favicon -->
    <link rel="shortcut icon" href="../../Assets/Logos/Logo buscafe amerelo/logo buscafe 72x72.png" type="image/x-icon">
    <!-- Links CSS -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
        integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
    <link rel="stylesheet" href="../../CSS/login.css">
    <link rel="stylesheet" href="../../CSS/recupSenha.css">
</head>
<body>
    
    <div class="main">

        <div class="container">
            
            <div class="content first-content">    
                
                <div class="second-column">

                    <?php
                    if(isset($_SESSION['empty'])):
                    ?>
                    <span>
                        <h4 id="reusltLogin"
                        style="
                        color: #933C3F;
                        border: 2px solid #ffc4c8;
                        background-color: #FEDCE0;
                        border-radius: 10px;
                        padding: 14px 10px;
                        width: 250px;
                        margin-bottom: 20px;
                        text-align: center;"
                        >Preencha todos os campos</h4>
                    </span>
                    <?php
                    endif;
                    unset($_SESSION['empty']);
                    ?>

                    <?php
                    if(isset($_SESSION['erro_senha'])):
                    ?>
                    <span>
                        <h4 id="reusltLogin"
                        style="
                        color: #933C3F;
                        border: 2px solid #ffc4c8;
                        background-color: #FEDCE0;
                        border-radius: 10px;
                        padding: 14px 10px;
                        width: 250px;
                        margin-bottom: 20px;
                        text-align: center;"
                        >Digite senhas iguais</h4>
                    </span>
                    <?php
                    endif;
                    unset($_SESSION['erro_senha']);
                    ?>

                    <h2 class="title title-second">Recuperar Senha</h2>

                    <p class="description description-second">Digite o nome de usuário</p>

                    <form action="recupSenha.php" method="POST" class="form">
                        <label class="label-input" for="">
                            <i class="fas fa-envelope icon-modify"></i>
                            <input type="email" placeholder="Email" name="email">
                        </label> 
                        <label class="label-input" for="">
                            <i class="fas fa-lock icon-modify"></i>
                            <input type="password" placeholder="Nova senha" name="novaSenha">
                        </label>   
                        <label class="label-input" for="">
                            <i class="fas fa-lock icon-modify"></i>
                            <input type="password" placeholder="Repita a nova senha" name="novaSenhaConfirm">
                        </label>              
                        
                        <button class="btn btn-second">Confirmar</button>
                    </form>
                </div>
            </div>
        </div>
        
    </div>

</body>
</html>