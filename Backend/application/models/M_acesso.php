<?php
defined('BASEPATH') OR exit('No direct script acess allowed');

class M_acesso extends CI_Model {

    public function validalogin($usuario, $senha){
        //Atributo retorno recebe o resultado do SELECT Realizado
        //na tabela de usuários, lembrando da função MD5()
        $retorno = $this->db->query("SELECT * FROM usuarios
                                     WHERE usuario = '$usuario'
                                       AND senha   = md5('$senha')
                                       AND estatus = ''");

        //Verificaa se a quantidade de linhas trazidas na consulta
        //é superior a 0, isso quer dizer que foi encontrado o
        //usuário e senha passados pela Controller.

        //Criando um arrau com dois elementos para retorno do resultado
        //1 - Codigo da mensagem
        //2 - Descrição da mensagem

        if($retorno->num_rows() > 0){
            $dados = array('codigo' => 1,
                           'msg' => 'Usuário correto');
        } else {
            $dados = array('codigo' => 4,
                           'msg' => 'Usuário ou senha inválidos');
        }
        //Envia o array $dados com as informações tratadas
        //acima pela estrutura de decisão if

        return $dados;
    }
}

?>