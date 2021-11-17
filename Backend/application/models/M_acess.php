<?php
defined('BASEPATH') OR exit('No direct script acess allowed');

use Firebase\JWT\JWT;

class M_acess extends CI_Model {

    public function validateLogin($email, $pass, $ip){
        //Checking if the user really exists and is activate
        $return = $this->db->query("SELECT nome, email, location, FK_id_uTipo
                                     FROM tbl_usuario
                                     WHERE email      = '$email'
                                       AND senha      = md5('$pass')
                                       AND FK_uStatus = 2");
        if($return->num_rows() > 0){
            //Query reuslt
            $user_data= $return->result()[0];

            //Saving ip and type
            $db_ip = $user_data->location;
            $type  = $user_data->FK_id_uTipo;
            //Delete ip and type from query result ($data)
            unset($user_data->FK_id_uTipo);
            unset($user_data->location);

            $key     = 'buscafeJWT';
            $jwt     = JWT::encode($user_data, $key, 'HS256'); //$user_data == payload

            if($db_ip == $ip){
                if($type == 1){
                    $data = array('code'  => 1,
                                  'msg'   => 'Conta pesssoal',
                                  'data'  => $user_data,
                                  'token' => $jwt);
                } else {
                    $data = array('code'  => 2,
                                  'msg'   => 'Conta corporativa',
                                  'data'  => $user_data,
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