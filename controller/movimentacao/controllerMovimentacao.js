const movimentacaoDAO = require('../../model/DAO/movimentacao.js')
const message = require('../../modulo/config.js')

const inserirMovimentacao = async function(dadosMovimentacao, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let resultDadosMovimentacao = {}

            if (dadosMovimentacao.id_movimentacao == '' || dadosMovimentacao.id_movimentacao == undefined || dadosMovimentacao.id_movimentacao == null ||
                dadosMovimentacao.id_usuario == '' || dadosMovimentacao.id_usuario == undefined || dadosMovimentacao.id_usuario == null ||
                dadosMovimentacao.id_livro == '' || dadosMovimentacao.id_livro == undefined || dadosMovimentacao.id_livro == null) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let novaMovimentacao = await movimentacaoDAO.inserirMovimentacao(dadosMovimentacao)

                if (novaMovimentacao) {
                    resultDadosMovimentacao.status = message.SUCCESS_CREATED_ITEM.status
                    resultDadosMovimentacao.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    resultDadosMovimentacao.message = message.SUCCESS_CREATED_ITEM.message
                    resultDadosMovimentacao.movimentacao = dadosMovimentacao

                    return resultDadosMovimentacao
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const listarMovimentacao = async function() {
    try {
        let dadosMovimentacoes = await movimentacaoDAO.selectAllMovimentacoes()

        if (dadosMovimentacoes) {
            if (dadosMovimentacoes.length > 0) {
                let movimentacoesJSON = {}
                movimentacoesJSON.movimentacoes = dadosMovimentacoes
                movimentacoesJSON.quantidade = dadosMovimentacoes.length
                movimentacoesJSON.status_code = 200

                return movimentacoesJSON
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const listarTiposMovimentacao = async function() {
    try {
        let dadosTipos = await movimentacaoDAO.selectAllTiposMovimentacao()

        if (dadosTipos) {
            if (dadosTipos.length > 0) {
                let tiposJSON = {}
                tiposJSON.tipos = dadosTipos
                tiposJSON.quantidade = dadosTipos.length
                tiposJSON.status_code = 200

                return tiposJSON
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

module.exports = {
    inserirMovimentacao,
    listarMovimentacao,
    listarTiposMovimentacao
}