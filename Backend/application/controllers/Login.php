<?php
defined('BASEPATH') OR exit('No direct script acess allowed');

class Login extends CI_Controller {

    public function logar(){
        ////////////////////////////////////////////////////////////
        //        Recebimento via JSON do Usuário e senha         //
        //                 Retornos possíveis:                    //
        //1 - Usuário e senha validados corretamente | (Banco)    //
        //2 - Faltou informar o usuário              | (Frontend) //
        //3 - Faltou informar a senha                | (Frontend) //
        //4 - Usuário ou senha inválidos             | (Banco)    //
        ////////////////////////////////////////////////////////////

        //Usuário e senha recebidos via JSON e colocados em atributos
        $json = file_get_contents('php://input');
        $resultado = json_decode($json);

        $usuario = $resultado->usuario;
        $senha   = $resultado->senha;

        if(trim($usuario) == ''){
            $retorno = array('codigo' => 2,
                             'msg' => 'Usuário não informado');
        } elseif (trim($senha) == ''){
            $retorno = array('codigo' => 3,
                             'msg' => 'Senha não informada');
        } else {
            //Instância da Model
            $this->load->model('m_acesso');

            //Atributo $retorno recebe array com informações da validação do acesso
            $retorno = $this->m_acesso->validalogin($usuario, $senha);
        }

        //Retorno no formato JSON
        echo json_encode($retorno);
    }
}

?>