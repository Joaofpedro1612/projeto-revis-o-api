const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const inserirUsuario = async function(dadosUsuario) {
    try {
        let sql = `insert into tbl_usuario (login, senha) values ('${dadosUsuario.login}', '${dadosUsuario.senha}')`
        let result = await prisma.$executeRawUnsafe(sql)
        return result
    } catch (error) {
        return false
    }
}

const atualizarUsuario = async function(dadosUsuario, idUsuario) {
    try {
        let sql = `update tbl_usuario set login = '${dadosUsuario.login}', senha = '${dadosUsuario.senha}' where id = ${idUsuario}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result
    } catch (error) {
        return false
    }
}

const excluirUsuario = async function(idUsuario) {
    try {
        let sql = `delete from tbl_usuario where id = ${idUsuario}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result
    } catch (error) {
        return false
    }
}

const selectAllUsuarios = async function() {
    try {
        let sql = 'select * from tbl_usuario order by id desc'
        let rsUsuarios = await prisma.$queryRawUnsafe(sql)
        return rsUsuarios
    } catch (error) {
        return false
    }
}

const selectByIdUsuario = async function(idUsuario) {
    try {
        let sql = `select * from tbl_usuario where id = ${idUsuario}`
        let rsUsuario = await prisma.$queryRawUnsafe(sql)
        return rsUsuario
    } catch (error) {
        return false
    }
}

const selectLastId = async function() {
    try {
        let sql = 'select CAST(last_insert_id() AS DECIMAL) as id from tbl_usuario limit 1'
        let rsUsuario = await prisma.$queryRawUnsafe(sql)
        return rsUsuario
    } catch (error) {
        return false
    }
}

module.exports = {
    inserirUsuario,
    atualizarUsuario,
    excluirUsuario,
    selectAllUsuarios,
    selectByIdUsuario,
    selectLastId
}