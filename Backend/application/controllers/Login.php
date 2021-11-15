<?php
defined('BASEPATH') OR exit('No direct script acess allowed');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

class Login extends CI_Controller {

    public function logar(){
        ////////////////////////////////////////////////////////////
        //        Recebimento via JSON do Usuário e senha         //
        //                 Retornos possíveis:                    //
        //1 - Usuário com conta pessoal              | (Banco)    //
        //2 - Usuário com conta corporativa          | (Banco)    //
        //3 - Campo email inexistente                | (Frontend) //
        //4 - Campo pass inexistente                 | (Frontend) //
        //5 - Usuário ou senha inválidos             | (Banco)    //
        //6 - Email não informado                    | (Frontend) //
        //7 - Senha não informada                    | (Frontend) //
        //8 - JSON é inexistente                     | (Frontend) //
        //9 - Novo Dispositivo Detectado             | (Banco)    //
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
            $return = array('code' => 3,
                            'msg' => 'Campo email inexistente');
        } else if (!array_key_exists('pass', $result)){
            $return = array('code' => 4,
                            'msg' => 'Campo pass inexistente');
        } else {
            $email = trim($result['email']); //$email recive "email" value from JSON
            $pass  = trim($result['pass']);  //$pass recive "pass" value from JSON

            //Checking if email and pass is empty
            if($email == ''){
                $return = array('code' => 6,
                                'msg' => 'Email não informado');
            } else if ($pass == ''){
                $return = array('code' => 7,
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