<?php
session_start();
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Buscafé</title>
    <!-- Favicon -->
    <link rel="shortcut icon" href="../../Assets/Logos/Logo buscafe amerelo/logo buscafe 72x72.png" type="image/x-icon">
    <!-- Links CSS -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
        integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
    <link rel="stylesheet" href="../../CSS/login.css">
</head>
<body>
    
    <div class="main">

        <div class="container">
            
            <div class="content first-content">

                <div class="first-column">
                    <h2 class="title title-primary">Bem vindo de Volta!</h2>
                    <p class="description description-primary">Para utilizar os benefícios do Buscafé</p>
                    <p class="description description-primary">por favor faça login com sua conta</p>
                    <button id="signin" class="btn btn-primary">Login</button>

                    <?php
                    if(isset($_SESSION['nao_autenticado'])):
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
                        margin: 20px auto;"
                        >Usuário ou senha inválidos</h4>
                    </span>
                    <?php
                    endif;
                    unset($_SESSION['nao_autenticado']);
                    ?>

                </div>    
                
                <div class="second-column">

                    <?php
                    if(isset($_SESSION['email_existe'])):
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
                        text-align: center;
                        margin-bottom: 20px"
                        >Email já foi Cadastrado</h4>
                    </span>
                    <?php
                    endif;
                    unset($_SESSION['email_existe']);
                    ?>

                    <?php
                    if(isset($_SESSION['status_cadastro'])):
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
                        text-align: center;
                        margin-bottom: 20px"
                        >Usuário Criado com Sucesso!</h4>
                    </span>
                    <?php
                    endif;
                    unset($_SESSION['status_cadastro']);
                    ?>

                    
                    <?php
                    if(isset($_SESSION['dados_em_branco'])):
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
                        text-align: center;
                        margin-bottom: 20px"
                        >Preencha todos os campos!</h4>
                    </span>
                    <?php
                    endif;
                    unset($_SESSION['dados_em_branco']);
                    ?>

                    <h2 class="title title-second">Criar uma conta</h2>
                    <div class="social-media">
                        <ul class="list-social-media">
                            <a class="link-social-media" href="#">
                                <li class="item-social-media">
                                    <i class="fab fa-facebook-f"></i>        
                                </li>
                            </a>
                            <a class="link-social-media" href="#">
                                <li class="item-social-media">
                                    <i class="fab fa-google"></i>
                                </li>
                            </a>
                            <a class="link-social-media" href="#">
                                <li class="item-social-media">
                                    <i class="fab fa-linkedin-in"></i>
                                </li>
                            </a>
                        </ul>
                    </div><!-- social media -->

                    <p class="description description-second">ou use seu email para registrar</p>

                    <form action="../Cadastro/cadastro.php" method="POST" class="form">
                        <label class="label-input" for="">
                            <i class="fas fa-user icon-modify"></i>
                            <input type="text" placeholder="Nome" name="user_c" required>
                        </label>
                        
                        <label class="label-input" for="">
                            <i class="fas fa-envelope icon-modify"></i>
                            <input type="email" placeholder="Email" name="email_c" required>
                        </label>
                        
                        <label class="label-input" for="">
                            <i class="fas fa-lock icon-modify"></i>
                            <input type="password" placeholder="Senha" name="senha_c" required>
                        </label>
                        
                        
                        <button class="btn btn-second">Cadastrar</button>
                    </form>
                </div><!-- second column -->
            </div><!-- first content -->

            <div class="content second-content">

                <div class="first-column">
                    <h2 class="title title-primary">Olá, Cristão!</h2>
                    <p class="description description-primary">Entre com seus dados</p>
                    <p class="description description-primary">e comece uma nova viajem conosco</p>
                    <button id="signup" class="btn btn-primary">Cadastrar</button>
                </div>

                <div class="second-column"> 
                    
                    <h2 class="title title-second">Fazer Login</h2>
                    <div class="social-media">
                        <ul class="list-social-media">
                            <a class="link-social-media" href="#">
                                <li class="item-social-media">
                                    <i class="fab fa-facebook-f"></i>
                                </li>
                            </a>
                            <a class="link-social-media" href="#">
                                <li class="item-social-media">
                                    <i class="fab fa-google"></i>
                                </li>
                            </a>
                            <a class="link-social-media" href="#">
                                <li class="item-social-media">
                                    <i class="fab fa-linkedin-in"></i>
                                </li>
                            </a>
                        </ul>
                    </div><!-- social media -->

                    <p class="description description-second">Entre com seus dados:</p>

                    <form action="login.php" method="POST" class="form">
                    
                        <label class="label-input" for="">
                            <i class="fas fa-user icon-modify"></i>
                            <input name="usuario" type="text" placeholder="Usuário" class="form-control" required>
                            <i class="fas icon-modify" id="resultUser"></i>
                        </label>
                    
                        <label class="label-input" for="">
                            <i class="fas fa-lock icon-modify"></i>
                            <input name="senha" type="password" placeholder="Senha" class="form-control" required>
                            <i class="fas icon-modify" id="resultPass"></i>
                        </label>
                    
                        <a class="password" href="../RecupSenha/index.php">Esqueceu sua senha?</a>
                        <button class="btn btn-second">Login</button>
                    </form>
                </div><!-- second column -->
            </div><!-- second-content -->
        </div>
        
        <script src="../../JS/login.js"></script>
    </div>

</body>
</html>