<?php
defined('BASEPATH') OR exit('No direct script acess allowed');

class M_acess extends CI_Model {

    public function validateLogin($email, $pass){
        //Checking if the user really exists and is activate
        $return = $this->db->query("SELECT nome, email, senha, location, FK_id_uTipo
                                     FROM tbl_usuario
                                     WHERE email      = '$email'
                                       AND senha      = md5('$pass')
                                       AND FK_uStatus = 2");
        if($return->num_rows() > 0){
            //$ip = $_SERVER['REMOTE_ADDR'];
            $ip = '192.168.100.2';

            //Query reuslt
            $data= $return->result()[0];

            //Saving ip and type
            $db_ip = $data->location;
            $type  = $data->FK_id_uTipo;
            //Delete ip and type from query result ($data)
            unset($data->FK_id_uTipo);
            unset($data->location);
    
            if($db_ip == $ip){
                if($type == 1){
                    $data = array('code' => 1,
                                  'msg'  => 'Conta pesssoal',
                                  'data' => $data);
                } else {
                    $data = array('code' => 2,
                                  'msg' => 'Conta corporativa',
                                  'data' => $data);
                }
            } else {
                $data = array('code' => 8,
                              'msg'  => 'Disposito de acesso diferente',
                              'ip'   => $ip);
            }
        } else {
            $data = array('code' => 4,
                          'msg'  => 'Usuário ou senha inválidos');
        }
        
        return $data;
    }
}

?>