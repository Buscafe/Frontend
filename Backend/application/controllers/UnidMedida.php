<?php
defined('BASEPATH') OR exit('No direct script acess allowed');

class UnidMedida extends CI_Controller {

    public function inserir(){
        //Sigla e Descrição
        //recebidos via JSON e colocados em variáveis
        //Retornos possíveis
        //1 - Unidade cadastrada corretamente (Banco)
        //2 - Faltou informar a sigla (Frontend)
        //3 - Quantidadede caracteres da sigle é superior a 3 (Frontend)
        //4 - Descrição não informada (Frontend)
        //5 - Usuário não informado (Frontend)
        //6 - Houve algum problema no insert da tabela (Banco)
        //7 - Houve um problema no salvamento do LOG, mas a unidade foi inclusa (LOG)
        $json = file_get_contents('php://input');
        $resultado = json_decode($json);

        $sigla     = $resultado->sigla;
        $descricao = $resultado->descricao;
        $usuario   = $resultado->usuario;

        //Validação se todos o dados foram enviados corretamente
         if(trim($sigla) == ''){
            $retorno = array('codigo' => 2,
                             'msg' => 'Sigla não informada');
        } elseif (strlen(trim($senha)) > 3){
            $retorno = array('codigo' => 3,
                             'msg' => 'Silga pode conter no máximo 3 caracteres');
        } elseif (trim($descricao) ==''){
            $retorno = array('codigo' => 4,
                             'msg' => 'Descrição não informada');
        } elseif (trim($usuario) == ''){
            $retorno = array('codigo' => 5,
                             'msg' => 'Usuário não informado');
        } else {
            //Instância da Model
            $this->load->model('m_unidmedida');

            //Atributo $retorno recebe array com informações da 
            //validação do acesso
            $retorno = $this->m_usuario->inserir($sigla, $descricao, $usuario);
        }

        echo json_encode($retorno);
    }

    public function consultar(){
        //Código, Sigla e Descrição
        //Recebidos via JSON e colocados em variáveis
        //Retornos Possíveis:
        //1 - Dados consultados corretamente (Banco)
        //2 - Quantidadede caracteres da sigle é superior a 3 (Frontend)
        //6 - Dados não encotrados (Banco)
        $json = file_get_contents('php://input');
        $resultado = json_decode($json);

        $codigo    = $resultado->codigo;
        $sigla     = $resultado->sigla;
        $descricao = $resultado->descricao;

        //Validação somente a qtde de caracteres da sigla, pode ser até 3
        //Caracteres ou nenhum para trazer todas as siglas
        if(strlen(trim($sigla)) > 3){
            $retorno = array('codigo' => 2,
                             'msg' => 'Sigla pode conter no máximo 3 caracteres ou nenhum para todas');
        } else {
            //Instância da Model
            $this->load->model('m_unidmedida');

            //Atributo $retorno recebe array com informações da 
            //validação do acesso
            $retorno = $this->m_usuario->consultar($codigo, $sigla, $descricao);
        }
        
        echo json_encode($retorno);
    }
}