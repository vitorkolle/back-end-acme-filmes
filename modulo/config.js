/********************************************************************************************
 * Objetivo: Arquivo responsável pela padronização de variáveis globais utilizadas no projeto
 * Data: 22/02
 * Autor: Vitor Paes Kolle
 * Versão: 1.0 
 * *****************************************************************************************/

/*************** Mensagens de Erro ************** */
const ERROR_INVALID_ID = {status: false, status_code: 400, message: 'O ID encaminhado na requisição não é válido!!'}
const ERROR_REQUIRED_FIELDS = {status: false, status_code: 400, message: 'Existem campos requeridos que não foram preenchidos, ou não atendem aos critérios de digitação!!'}
const ERROR_NOT_FOUND = {status: false, status_code: 404, message: 'Não foram encontrados itens na requisição!!'}
const ERROR_INTERNAL_SERVER_DB = {status: false, status_code: 500, message: 'Não foi possível processar a requisição devido à um problema na comunicação com o Banco de Dados. Contate o Administrador da API!!'}
const ERROR_CONTENT_TYPE = {status: false, status_code: 415, message: 'O content-type encaminhado na requisição não é permitido pelo servidor da API. Deve-se utilizar somente application/json!!!' }
const ERROR_INTERNAL_SERVER = {status: false, status_code:500, message: 'Não foi possível processar a requisição devido à um problema na camada de negócio/controle do projeto. Contate o administrador da API!!'}
/****************** Mensagens de Sucesso ******** */
const SUCCESS_CREATED_ITEM = {status: true, status_code: 201, message: 'Item criado com sucesso!!'}
const SUCCESS_DELETED_ITEM = {status: true, status_code: 200, message: 'Item deletado com sucesso!!'}
const SUCCESS_UPDATED_ITEM = {status: true, status_code: 200, message: 'Item atualizado com sucesso!!'}

module.exports = {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DB,
    ERROR_REQUIRED_FIELDS,
    SUCCESS_CREATED_ITEM,
    ERROR_CONTENT_TYPE,
    ERROR_INTERNAL_SERVER,
    SUCCESS_DELETED_ITEM,
    SUCCESS_UPDATED_ITEM
}