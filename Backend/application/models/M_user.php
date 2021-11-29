<?php
defined('BASEPATH') OR exit('No direct script acess allowed');

class M_user extends CI_Model {

    public function insert($email, $pass, $ip, $name, $user_type){
        $return = $this->db->query("SELECT id
                                      FROM tbl_usuario
                                      WHERE email      = '$email'
                                        AND senha      = md5('$pass')
                                        AND FK_uStatus = 2");

        if(!$return->num_rows() > 0){
            $sql = "INSERT INTO tbl_usuario(nome, email, senha, location, dtCria, FK_id_uTipo, FK_uStatus)
                       VALUES ('$name'  , '$email', md5('$pass'), '$ip' , current_timestamp() , $user_type , 2 )";

            $this->db->query($sql); 

            if($this->db->affected_rows() > 0){
                $data = array('code'  => 1,
                                'msg'   => 'Usuário Cadastrado Corretamente');
            } else {
                $data = array('code' => 5,
                            'msg'  => 'Houve um problema na inserção do usuário');
            }
        } else {
            $data = array('code' => 6,
                          'msg'  => 'Usuário existente');
        }
        
        return $data;
    }

    public function update($email, $pass, $ip){
        $return = $this->db->query("SELECT id
                                      FROM tbl_usuario
                                      WHERE email      = '$email'
                                        AND FK_uStatus = 2");

        if($return->num_rows() > 0){
            $id = intval($return->result()[0]->id);
            $return = $this->db->query("UPDATE tbl_usuario 
                                           SET senha = md5('$pass')
                                           WHERE id = $id");

            if($this->db->affected_rows() > 0){
                $data = array('code' => 1,
                              'msg' => 'Usuário atualizado corretamente');
            } else {
                $data = array('code' => 2,
                              'msg' => 'Dados iguais a base de dados');
            }
        } else {
            $data = array('code' => 6,
                          'msg'  => 'Usuário inexistente');
        }
        
        return $data;
    }
}

?>