<?php
defined('BASEPATH') OR exit('No direct script acess allowed');

class M_acess extends CI_Model {

    public function validateLogin($email, $pass){
        $return = $this->db->query("SELECT * FROM usuario
                                     WHERE email    = '$email'
                                       AND senha    = '$pass'
                                       AND uEstatus = 1");

        if($return->num_rows() > 0){
            $data = array('code' => 1,
                           'msg' => 'Usuário correto');
        } else {
            $data = array('code' => 4,
                           'msg' => 'Usuário ou senha inválidos');
        }

        return $data;
    }
}

?>