<?php
defined('BASEPATH') OR exit('No direct script acess allowed');

class M_usuario extends CI_Model {
    public function inserir($usuario, $senha, $nome, $tipo_usuario, $usu_sistema){
        //Query de inserção dos dados
        $sql = "INSERT INTO usuarios (usuario, senha, nome, tipo)
        VALUES ('$usuario', md5('$senha'), '$nome', '$tipo_usuario')";

        $this->db->query($sql);

        //Verificar se a inserção ocorreu com sucesso
        if($this->db->affected_rows() > 0){
            $dados = array('codigo' => 1,
                               'msg' => 'Usuário cadastrado corretamente');
        } else {
            $dados = array('codigo' => 6,
                           'msg' => 'Houve algum problema na inserção na tabela usuários');
        }
        //Envia o array $dados com as informações tratadas
        //acima pela estrutura de decisão if
        return $dados;
    }

    public function consultar($usuario, $nome, $tipo_usuario){
        //------------------------------------------------------
        //Função que serviá para quatro tipos de consulta:
        // * Para todos os usuários;
        // * Para um determinado usuário;
        // * Para um tipo de usuário;
        // * Para nomes de usuários;
        //------------------------------------------------------

        //Query para consultar dados e acordo com parâmetros passados
        $sql = "SELECT * FROM usuarios WHERE estatus = '' ";

        if($usuario != ''){
            $sql = $sql . "AND usuario = '$usuario' ";
        }

        if($tipo_usuario != ''){
            $sql = $sql . "AND tipo = '$tipo_usuario' ";
        }

        if($nome != ''){
            $sql = $sql . "AND nome LIKE '%$nome%' ";
        }

        $retorno = $this->db->query($sql);

        //Verificar se a consulta ocorreu com sucesso
        if($retorno->num_rows() > 0){
            $dados = array('codigo' => 1,
                           'msg' => 'Consulta efetuada com sucesso',
                           'dados' => $retorno->result());
        } else {
            $dados = array('codigo' => 6,
                           'msg' => 'Dados não encontrados');
        }
        //Envia o array $dados com as informações tratadas
        //acima pela estrutura de decisão if
        return $dados;
    }

    public function alterar($usuario, $nome, $senha, $tipo_usuario, $usu_sistema){
        ///------------------------------------------------------
        //Função que serviá para quatro tipos de alterção:
        // * Para todos os usuários;
        // * Para um determinado usuário;
        // * Para um tipo de usuário;
        // * Para nomes de usuários;
        //------------------------------------------------------

        //Query para consultar dados e acordo com parâmetros passados
        $sql = "UPDATE usuarios ";

        //Verificando qual vai ser o primeiro campo da alteração (SET)
        $senhaIsSet       = false;
        $nomeIsSet        = false;
        $tipoUsuarioisSet = false;

        if($nome != ''){
            $sql = $sql . "SET nome = '$nome'";
            $nomeIsSet = true;
        } else if ($senha != ''){
            $sql = $sql . "SET senha = md5('$senha')";
            $senhaIsSet = true;
        } else {
            $sql = $sql . "SET tipo = '$tipo_usuario'";
            $tipoUsuarioisSet = true;
        }

        //Verificando se mais de 1 campo deve ser alterado
        if($senha != '' && !$senhaIsSet){
            $sql = $sql . ", senha = md5('$senha')";
        }

        if($nome != '' && !$nomeIsSet){
            $sql = $sql . ", nome = '$nome'";
        }
        
        if($tipo_usuario != '' && !$tipoUsuarioisSet){
            $sql = $sql . ", tipo = '$tipo_usuario'";
        }

        $sql = $sql . " WHERE usuario = '$usuario'";

        $retorno = $this->db->query($sql);

        //Verificar se a atualização ocorreu com sucesso
        if($this->db->affected_rows() > 0){
            //Fazemos a inserção no Log na nuvem
            //Fazemos a instância da model M_log
            $this->load->model('m_log');

            //Fazemos a chamada do método de inserção do Log
            $retorno_log = $this->m_log->inserir_log($usu_sistema, $sql);

            if($retorno_log['codigo'] == 1){
                $dados = array('codigo' => 1,
                               'msg' => 'Usuário atualizado corretamente');
            } else {
                $dados = array('codigo' => 8,
                               'msg' => 'Houve um problema no salvamento do LOG, porém, usuário cadastrado corretamente');
            } 
        } else {
            $dados = array('codigo' => 6,
                        'msg' => 'Houve algum problema na atualização na tabela de usuários');
        }
        //Envia o array $dados com as informações tratadas
        //acima pela estrutura de decisão if
        return $dados;
    }

    public function desativar($usuario, $usu_sistema){
        //Query de atualização dos dados 
        $this->db->query("UPDATE usuarios SET estatus = 'D'
                          WHERE usuario = '$usuario'");

        //Verificar se a atualização ocorreu com sucesso
        if($this->db->affected_rows() > 0){
            //Fazemos a inserção no Log na nuvem
            //Fazemos a instância da model M_log
            $this->load->model('m_log');

            //Fazemos a chamada do método de inserção do Log
            $retorno_log = $this->m_log->inserir_log($usu_sistema, $sql);

            if($retorno_log['codigo'] == 1){
                $dados = array('codigo' => 1,
                               'msg' => 'Usuário DESATIVADO corretamente');
            } else {
                $dados = array('codigo' => 8,
                               'msg' => 'Houve um problema no salvamento do LOG, porém, usuário cadastrado corretamente');
            } 
        } else {
            $dados = array('codigo' => 6,
                           'msg' => 'Houve algum problema na DESATIVAÇÃO do usuário');
        }
        //Envia o array $dados com as informações tratadas
        //acima pela estrutura de decisão if
        return $dados;
    }
}

?>