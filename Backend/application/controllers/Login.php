<?php
defined('BASEPATH') OR exit('No direct script acess allowed');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

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
        $result = json_decode($json);

        $email = $result->email;
        $pass  = $result->pass;

        if(trim($email) == ''){
            $return = array('code' => 2,
                             'msg' => 'Usuário não informado');
        } elseif (trim($pass) == ''){
            $return = array('code' => 3,
                             'msg' => 'Senha não informada');
        } else {
            $this->load->model('m_acess');

            $return = $this->m_acess->validateLogin($email, $pass);
        }

        //Retorno no formato JSON
        echo json_encode($return);
    }
}

?>