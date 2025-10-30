const livroDAO = require('../../model/DAO/livro.js')
const message = require('../../modulo/config.js')

const inserirLivro = async function(dadosLivro, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let resultDadosLivro = {}

            if (dadosLivro.titulo == '' || dadosLivro.titulo == undefined || dadosLivro.titulo == null || dadosLivro.titulo.length > 100 ||
                dadosLivro.quantidade == '' || dadosLivro.quantidade == undefined || dadosLivro.quantidade == null) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let novoLivro = await livroDAO.inserirLivro(dadosLivro)

                if (novoLivro) {
                    let ultimoId = await livroDAO.selectLastId()
                    dadosLivro.id = ultimoId[0].id

                    resultDadosLivro.status = message.SUCCESS_CREATED_ITEM.status
                    resultDadosLivro.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    resultDadosLivro.message = message.SUCCESS_CREATED_ITEM.message
                    resultDadosLivro.livro = dadosLivro

                    return resultDadosLivro
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

const atualizarLivro = async function(dadosLivro, idLivro, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let resultDadosLivro = {}

            if (idLivro == '' || idLivro == undefined || idLivro == null || isNaN(idLivro)) {
                return message.ERROR_INVALID_ID
            } else if (dadosLivro.titulo == '' || dadosLivro.titulo == undefined || dadosLivro.titulo == null || dadosLivro.titulo.length > 100 ||
                       dadosLivro.quantidade == '' || dadosLivro.quantidade == undefined || dadosLivro.quantidade == null) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let livroAtualizado = await livroDAO.atualizarLivro(dadosLivro, idLivro)

                if (livroAtualizado) {
                    dadosLivro.id = idLivro
                    resultDadosLivro.status = message.SUCCESS_UPDATED_ITEM.status
                    resultDadosLivro.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    resultDadosLivro.message = message.SUCCESS_UPDATED_ITEM.message
                    resultDadosLivro.livro = dadosLivro

                    return resultDadosLivro
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

const excluirLivro = async function(idLivro) {
    try {
        if (idLivro == '' || idLivro == undefined || idLivro == null || isNaN(idLivro)) {
            return message.ERROR_INVALID_ID
        } else {
            let buscarLivro = await livroDAO.selectByIdLivro(idLivro)

            if (buscarLivro.length > 0) {
                let livroExcluido = await livroDAO.excluirLivro(idLivro)

                if (livroExcluido) {
                    return message.SUCCESS_DELETED_ITEM
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            } else {
                return message.ERROR_NOT_FOUND
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const listarLivro = async function() {
    try {
        let dadosLivros = await livroDAO.selectAllLivros()

        if (dadosLivros) {
            if (dadosLivros.length > 0) {
                let livrosJSON = {}
                livrosJSON.livros = dadosLivros
                livrosJSON.quantidade = dadosLivros.length
                livrosJSON.status_code = 200

                return livrosJSON
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

const buscarLivro = async function(idLivro) {
    try {
        if (idLivro == '' || idLivro == undefined || idLivro == null || isNaN(idLivro)) {
            return message.ERROR_INVALID_ID
        } else {
            let dadosLivro = await livroDAO.selectByIdLivro(idLivro)

            if (dadosLivro) {
                if (dadosLivro.length > 0) {
                    let livroJSON = {}
                    livroJSON.livro = dadosLivro[0]
                    livroJSON.status_code = 200

                    return livroJSON
                } else {
                    return message.ERROR_NOT_FOUND
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_DB
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

module.exports = {
    inserirLivro,
    atualizarLivro,
    excluirLivro,
    listarLivro,
    buscarLivro
}