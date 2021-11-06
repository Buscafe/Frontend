<?php
defined('BASEPATH') OR exit('No direct script acess allowed');

class M_acess extends CI_Model {

    public function validateLogin($email, $pass){
        //Checking if the user really exists and is activate
        $return = $this->db->query("SELECT id FROM tbl_usuario
                                     WHERE email      = '$email'
                                       AND senha      = md5('$pass')
                                       AND FK_uStatus = 2");

        if($return->num_rows() > 0){
            $id = $return->result()[0]->id; //Result return an array with object inside, but we only need the id values
            // If FK_id_uTipo returns:
            // 1 = personal account 
            // 2 = business account
            $return = $this->db->query("SELECT * FROM tbl_usuario
                                         WHERE id = $id
                                           AND FK_id_uTipo = 1");

            if($return->num_rows() > 0){
                $data = array('code' => 1,
                              'msg'  => 'Conta pesssoal');
            } else {
                $data = array('code' => 2,
                              'msg'  => 'Conta corporativa');
            }
        } else {
            $data = array('code' => 4,
                           'msg' => 'Usuário ou senha inválidos');
        }

        return $data;
    }
}

?>