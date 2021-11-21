<?php
defined('BASEPATH') OR exit('No direct script acess allowed');

class M_user extends CI_Model {

    public function insert($email, $pass, $ip, $name, $user_type){
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
        
        return $data;
    }
}

?>