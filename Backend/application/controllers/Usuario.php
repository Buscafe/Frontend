<?php
defined('BASEPATH') OR exit('No direct script acess allowed');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

class Usuario extends CI_Controller {
    
    public function inserir(){
        //Usuário, senha, nome, tipo (Administrador ou Comum)
        //recebidos via JSON e colocados em variáveis
        //Retornos possíveis
        //1 - Usuário cadastrado corretamente (Banco)
        //2 - Faltou informar o usuário (Frontend)
        //3 - Faltou informar a senha (Frontend)
        //4 - Faltou informar o nome (Frontend)
        //5 - Faltou informar o tipo de usuário (Frontend)
        //6 - Houve algum problema no INSERT da tabela (Banco)
        //7 - Usuário do sistema não informado (Frontend)
        //8 - Houve um problema no salvamento do LOG, mas o usuário foi incluso (LOG)
        $json = file_get_contents('php://input');
        $resultado = json_decode($json);

        $usuario      = $resultado->usuario;
        $senha        = $resultado->senha;
        $nome         = $resultado->nome;
        $tipo_usuario = strtoupper($resultado->tipo_usuario);

        //Abaixo colocaremos o usuário do sistema
        $usu_sistema  = strtoupper($resultado->usu_sistema);  

        //Validação para saber se os dados foram enviados
        if(trim($usu_sistema) == ''){
            $retorno = array('codigo' => 7,
                             'msg' => 'Usuário do sistema não informado');
        } elseif(trim($usuario) == ''){
            $retorno = array('codigo' => 2,
                             'msg' => 'Usuário não informado');
        } elseif (trim($senha) == ''){
            $retorno = array('codigo' => 3,
                             'msg' => 'Senha não informada');
        } elseif (trim($nome) ==''){
            $retorno = array('codigo' => 4,
                             'msg' => 'Nome não informado');
        } elseif ((trim($tipo_usuario) != 'ADMINISTRADOR' &&
                   trim($tipo_usuario) != 'COMUM'        )||
                   trim($tipo_usuario) == ''){
            $retorno = array('codigo' => 5,
                             'msg' => 'Tipo de usuário inválido');
        } else {
            //Instância da Model
            $this->load->model('m_usuario');

            //Atributo $retorno recebe array com informações da 
            //validação do acesso
            $retorno = $this->m_usuario->inserir($usuario, $senha, $nome, $tipo_usuario, $usu_sistema);
        }

        echo json_encode($retorno);
    }

    public function consultar(){
        //Usuário, nome e tipo (Administrador ou Comum)
        //Recebidps via JSON e colocados em variáveis
        //Retornos Possíveis:
        //1 - Usuário cadastrado corretamente (Banco)
        //5 - Tipo de usuário inválido  (Frontend)
        //6 - Dados não encotrados (Banco)
        $json = file_get_contents('php://input');
        $resultado = json_decode($json);

        $usuario      = $resultado->usuario;
        $nome         = $resultado->nome;
        $tipo_usuario = strtoupper($resultado->tipo_usuario);

        //Validação para tipo de usuário que deverá ser ADMINISTRADOR, COMUM ou VAZIO
        if( trim($tipo_usuario) != 'ADMINISTRADOR' &&
            trim($tipo_usuario) != 'COMUM'        &&
            trim($tipo_usuario) != ''){

            $retorno = array('codigo' => 5,
                             'msg' => 'Tipo de usuário inválido');
        } else {
            //Instância da Model
            $this->load->model('m_usuario');

            //Atributo $retorno recebe array com informações da 
            //validação do acesso
            $retorno = $this->m_usuario->consultar($usuario, $nome, $tipo_usuario);
        }
        
        echo json_encode($retorno);
    }

    public function alterar(){
        //Usuário, nome, senha e tipo (Administraor ou Comum)
        //recebidos via JSON colocados em variáveis
        //Retornos possíveis:
        //1 - Dado(s) alterado(s) corretamente (Banco)
        //2 - Usuario em Branco ou Zerado
        //3 - Nome não informado
        //4 - Senha em branco
        //5 - Tipo de usuário inválido (Frontend)
        //6 - Dados não encontrados (Banco)
        //7 - É necessário informar ao menos 1 (um) campo
        //8 - Usuário do sistema não informado (Frontend)
        //9 - Houve um problema no salvamento do LOG, mas o usuário foi incluso (LOG)
        $json = file_get_contents('php://input');
        $resultado = json_decode($json);

        $usuario      = $resultado->usuario;
        $senha        = $resultado->senha;
        $nome         = $resultado->nome;
        $tipo_usuario = strtoupper($resultado->tipo_usuario);
        //Abaixo colocaremos o usuário do sistema
        $usu_sistema  = strtoupper($resultado->usu_sistema);  

        //Validação para tipo de usuário que deverá ser ADMINISTRADOR, COMUM ou VAZIO
        if( trim($tipo_usuario) != 'ADMINISTRADOR' &&
            trim($tipo_usuario) != 'COMUM'         &&
            trim($tipo_usuario) != ''){

            $retorno = array('codigo' => 5,
                             'msg' => 'Tipo de usuário inválido');
        } else if (trim($usuario) == ''){
            $retorno = array('codigo' => 2,
                             'msg' => 'Usuario em Branco');
        } else if(trim($usu_sistema) == ''){
            $retorno = array('codigo' => 8,
                             'msg' => 'Usuário do sistema não informado');
        }else if (trim($senha) == '' && trim($nome) == '' && trim($tipo_usuario) == '' && trim($usu_sistema)){
            $retorno = array('codigo' => 7,
                             'msg' => 'É necessário informar ao menos 2 (dois) campos');
        } else {
            //Instância da Model
            $this->load->model('m_usuario');

            //Atributo $retorno recebe array com informações da 
            //validação dos dados
            $retorno = $this->m_usuario->alterar($usuario, $nome, $senha, $tipo_usuario, $usu_sistema);
        }

        echo json_encode($retorno);
    }

    public function desativar(){
        //Usuário recebidos via JSON e colocado em variável
        //Retornos possíveis:
        //1 - Usuário desativado corretamente (Banco)
        //2 - Usuário em Branco
        //6 - Dados não encontrados (Banco)
        //7 - Usuário do sistema não informado (Frontend)
        //8 - Houve um problema no salvamento do LOG, mas o usuário foi incluso (LOG)
        $json = file_get_contents('php://input');
        $resultado = json_decode($json);

        $usuario      = $resultado->usuario;
        //Abaixo colocaremos o usuário do sistema
        $usu_sistema  = strtoupper($resultado->usu_sistema);  

        //Validação para do usuário que não deverá ser branco
        if (trim($usu_sistema) == ''){
            $retorno = array('codigo' => 2,
                             'msg' => 'Usuário do sistema não informado');
        }else if (trim($usuario) == ''){
            $retorno = array('codigo' => 2,
                             'msg' => 'Usuário não informado');
        } else {
            //Instância da Model
            $this->load->model('m_usuario');

            //Atributo $retorno recebe array com informações da 
            //validação dos dados
            $retorno = $this->m_usuario->desativar($usuario, $usu_sistema);
        }

        echo json_encode($retorno);
    }
}