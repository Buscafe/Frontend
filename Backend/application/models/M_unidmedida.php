<?php
defined('BASEPATH') OR exit('No direct script acess allowed');

class M_usuario extends CI_Model {
    public function inserir($sigla, $descricao, $usuario){
        //Query de inserção dos dados
        $sql = "INSERT INTO unid_medida (sigla, descricao, usucria)
                VALUES ('$sigla', '$descricao', '$usuario')";

        $this->db->query($sql);

        //Verificar se a inserção ocorreu com sucesso
        if($this->db->affected_rows() > 0){
            //Fazemos a inserção no Log na nuvem
            //Fazemos a instância da model M_log
            $this->load->model('m_log');

            //Fazemos a chamada do método de inserção do Log
            $retorno_log = $this->m_log->inserir_log($usuario, $sql);

            if($retorno_log['codigo'] == 1){
                $dados = array('codigo' => 1,
                               'msg' => 'Unidade de medida cadastrada corretamente');
            } else {
                $dados = array('codigo' => 8,
                               'msg' => 'Houve um problema no salvamento do LOG, porém, usuário cadastrado corretamente');
            } 
            
        } else {
            $dados = array('codigo' => 6,
                           'msg' => 'Houve algum problema na inserção na tabela usuários');
        }
        //Envia o array $dados com as informações tratadas
        //acima pela estrutura de decisão if
        return $dados;
    }
}

?>