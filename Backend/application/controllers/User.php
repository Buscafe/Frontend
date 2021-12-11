<?php
defined('BASEPATH') OR exit('No direct script acess allowed');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

class User extends CI_Controller {

    public function insert(){
        //Usuário, senha, nome, tipo (Corporativo ou Comum)
        //recebidos via JSON e colocados em variáveis
        //Retornos possíveis:
        //1 - Usuário cadastrado corretamente (Banco)
        //2 - Faltou informar o usuário (Frontend)
        //3 - Faltou informar a senha (Frontend)
        //4 - Faltou informar o nome (Frontend)
        //5 - Faltou informar o tipo de usuário (Frontend)
        //6 - Houve algum problema no INSERT da tabela (Banco)
        //7 - Usuário do sistema não informado (Frontend)
        //8 - Houve um problema no salvamento do LOG, mas o usuário foi incluso (LOG)
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
        } else if (!array_key_exists('ip', $result)){
            $return = array('code' => 5,
                            'msg' => 'Campo ip inexistente');
        } else if (!array_key_exists('name', $result)){
            $return = array('code' => 6,
                            'msg' => 'Campo name inexistente');
        } else if (!array_key_exists('user_type', $result)){
            $return = array('code' => 7,
                            'msg' => 'Campo user_type inexistente');
        } else {
            $email     = trim($result['email']);
            $pass      = trim($result['pass']);
            $ip        = trim($result['ip']);
            $name      = trim($result['name']);
            $user_type = trim($result['user_type']);

            if($user_type == ''){
                $return = array('codigo' => 8,
                                 'msg' => 'Usuário do sistema não informado');
            } elseif($email == ''){
                $return = array('codigo' => 9,
                                 'msg' => 'Email não informado');
            } elseif ($pass == ''){
                $return = array('codigo' => 10,
                                 'msg' => 'Senha não informada');
            } elseif ($name == ''){
                $return = array('codigo' => 11,
                                 'msg' => 'Nome não informado');
            } else if($ip == ''){
                $return = array('codigo' => 12,
                                 'msg' => 'Ip não informado');
            } else {
                $this->load->model('m_user');
    
                $return = $this->m_user->insert($email, $pass, $ip, $name, $user_type);
            }
        }

        echo json_encode($return);
    }

    public function update(){
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
        $json   = file_get_contents('php://input');
        $result = json_decode($json, true);

        //Checking if the frontend sent the JSON correctly 
        if($result === null){
            $return = array('code' => 8,
                            'msg' => 'JSON inexistente');

            echo json_encode($return, true);
            return;
        }  

        //Checking if keys email and pass exists in JSON 
        if(!array_key_exists('email', $result)){
            $return = array('code' => 3,
                            'msg' => 'Campo email inexistente');
        } else if (!array_key_exists('ip', $result)){
            $return = array('code' => 4,
                            'msg' => 'Campo ip inexistente');
        } else {
            $pass  = trim($result['pass']);
            $ip    = trim($result['ip']);
            $email = trim($result['email']);           

            if ($email == ''){
                $return = array('codigo' => 9,
                                'msg' => 'Email não informado');
            } else if ($ip == ''){
                $return = array('codigo' => 10,
                                'msg' => 'Ip não informado');
            } else {
                $this->load->model('m_user');
    
                $return = $this->m_user->update($email, $pass, $ip);
            }
        }

        echo json_encode($return);
    }

}