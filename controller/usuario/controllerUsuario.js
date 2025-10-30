const usuarioDAO = require('../../model/DAO/usuario.js')
const message = require('../../modulo/config.js')

const inserirUsuario = async function(dadosUsuario, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let resultDadosUsuario = {}

            if (dadosUsuario.login == '' || dadosUsuario.login == undefined || dadosUsuario.login == null || dadosUsuario.login.length > 45 ||
                dadosUsuario.senha == '' || dadosUsuario.senha == undefined || dadosUsuario.senha == null || dadosUsuario.senha.length > 45) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let novoUsuario = await usuarioDAO.inserirUsuario(dadosUsuario)

                if (novoUsuario) {
                    let ultimoId = await usuarioDAO.selectLastId()
                    dadosUsuario.id = ultimoId[0].id

                    resultDadosUsuario.status = message.SUCCESS_CREATED_ITEM.status
                    resultDadosUsuario.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    resultDadosUsuario.message = message.SUCCESS_CREATED_ITEM.message
                    resultDadosUsuario.usuario = dadosUsuario

                    return resultDadosUsuario
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

const listarUsuario = async function() {
    try {
        let dadosUsuarios = await usuarioDAO.selectAllUsuarios()

        if (dadosUsuarios) {
            if (dadosUsuarios.length > 0) {
                let usuariosJSON = {}
                usuariosJSON.usuarios = dadosUsuarios
                usuariosJSON.quantidade = dadosUsuarios.length
                usuariosJSON.status_code = 200

                return usuariosJSON
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

const buscarUsuario = async function(idUsuario) {
    try {
        if (idUsuario == '' || idUsuario == undefined || idUsuario == null || isNaN(idUsuario)) {
            return message.ERROR_INVALID_ID
        } else {
            let dadosUsuario = await usuarioDAO.selectByIdUsuario(idUsuario)

            if (dadosUsuario) {
                if (dadosUsuario.length > 0) {
                    let usuarioJSON = {}
                    usuarioJSON.usuario = dadosUsuario[0]
                    usuarioJSON.status_code = 200

                    return usuarioJSON
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
    inserirUsuario,
    listarUsuario,
    buscarUsuario
}