const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const inserirLivro = async function(dadosLivro) {
    try {
        let sql = `insert into tbl_livro (titulo, data_publicacao, quantidade, isbn) values ('${dadosLivro.titulo}', '${dadosLivro.data_publicacao}', ${dadosLivro.quantidade}, '${dadosLivro.isbn}')`
        let result = await prisma.$executeRawUnsafe(sql)
        return result
    } catch (error) {
        return false
    }
}

const atualizarLivro = async function(dadosLivro, idLivro) {
    try {
        let sql = `update tbl_livro set titulo = '${dadosLivro.titulo}', data_publicacao = '${dadosLivro.data_publicacao}', quantidade = ${dadosLivro.quantidade}, isbn = '${dadosLivro.isbn}' where id = ${idLivro}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result
    } catch (error) {
        return false
    }
}

const excluirLivro = async function(idLivro) {
    try {
        let sql = `delete from tbl_livro where id = ${idLivro}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result
    } catch (error) {
        return false
    }
}

const selectAllLivros = async function() {
    try {
        let sql = 'select * from tbl_livro order by id desc'
        let rsLivros = await prisma.$queryRawUnsafe(sql)
        return rsLivros
    } catch (error) {
        return false
    }
}

const selectByIdLivro = async function(idLivro) {
    try {
        let sql = `select * from tbl_livro where id = ${idLivro}`
        let rsLivro = await prisma.$queryRawUnsafe(sql)
        return rsLivro
    } catch (error) {
        return false
    }
}

const selectLastId = async function() {
    try {
        let sql = 'select CAST(last_insert_id() AS DECIMAL) as id from tbl_livro limit 1'
        let rsLivro = await prisma.$queryRawUnsafe(sql)
        return rsLivro
    } catch (error) {
        return false
    }
}

module.exports = {
    inserirLivro,
    atualizarLivro,
    excluirLivro,
    selectAllLivros,
    selectByIdLivro,
    selectLastId
}