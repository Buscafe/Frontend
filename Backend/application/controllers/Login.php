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
        //2 - Campo email não informado              | (Frontend) //
        //3 - Campo pass não informado               | (Frontend) //
        //4 - Usuário ou senha inválidos             | (Banco)    //
        //5 - Faltou informar o Email                | (Frontend) //
        //6 - Faltou informar a Senha                | (Frontend) //
        //7 - JSON é inexistente                     | (Frontend) //
        //////////////////////////////////////////////////////////// 
        
        $json   = file_get_contents('php://input');
        $result = json_decode($json, true);

        //Checking if the frontend sent the JSON correctly 
        if($result === null){
            $return = array('code' => 8,
                            'msg' => 'JSON inexistente');

            echo json_encode($return);
            return;
        }  

        //Checking if keys email and pass exists in JSON 
        if(!array_key_exists('email', $result)){
            $return = array('code' => 2,
                            'msg' => 'Campo email inexistente');
        } else if (!array_key_exists('pass', $result)){
            $return = array('code' => 3,
                            'msg' => 'Campo pass inexistente');
        } else {
            $email = trim($result['email']); //$email recive "email" value from JSON
            $pass  = trim($result['pass']);  //$pass recive "pass" value from JSON

            //Checking if email and pass is empty
            if($email == ''){
                $return = array('code' => 5,
                                'msg' => 'Email não informado');
            } else if ($pass == ''){
                $return = array('code' => 6,
                                'msg' => 'Senha não informada');
            } else {
                $this->load->model('m_acess');

                $return = $this->m_acess->validateLogin($email, $pass);
            } 
        }
        
        echo json_encode($return);
    }
}

?>