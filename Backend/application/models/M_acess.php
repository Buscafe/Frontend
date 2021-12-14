<?php
defined('BASEPATH') OR exit('No direct script acess allowed');

use Firebase\JWT\JWT;

class M_acess extends CI_Model {

    public function validateLogin($email, $pass, $ip){
        $return = $this->db->query("SELECT usuario, nome, religiao, localizacao, email, ip, tipo
                                     FROM tbl_usuario
                                     WHERE email      = '$email'
                                       AND senha      = md5('$pass')
                                       AND FK_id_estatus = 1");
        if($return->num_rows() > 0){
            $user_data= $return->result()[0];

            //Saving ip and type
            $db_ip = $user_data->ip;
            $type  = $user_data->tipo;
            //Delete ip and type from query result ($data)
            unset($user_data->tipo);
            unset($user_data->ip);
            
            //Destructuring property location in 2 fields ('city' and 'state')
            $location = explode('/', $user_data->localizacao);
            $location = (object)array('estado' => $location[0], 'cidade' => $location[1]);
            $user_data->localizacao = $location;

            $user_data->ip = $db_ip;
            
            $key = 'buscafeJWT';
            $jwt = JWT::encode($user_data, $key, 'HS256'); //$user_data == payload

            if($db_ip == $ip){
                if($type == 1){
                    $data = array('code'  => 1,
                                  'msg'   => 'Conta pesssoal',
                                  'token' => $jwt);
                } else {
                    $data = array('code'  => 2,
                                  'msg'   => 'Conta corporativa',
                                  'token' => $jwt);
                }
            } else {
                $data = array('code' => 9,
                              'msg'  => 'Disposito de acesso diferente',
                              'ip'   => $ip);
            }
        } else {
            $data = array('code' => 5,
                          'msg'  => 'Usuário ou senha inválidos');
        }
        
        return $data;
    }
}

?>