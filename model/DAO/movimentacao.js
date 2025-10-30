const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const inserirMovimentacao = async function(dadosMovimentacao) {
    try {
        let sql = `insert into tbl_movimentacao (id_movimentacao, id_usuario, quantidade, data_movimentacao, id_livro) values (${dadosMovimentacao.id_movimentacao}, ${dadosMovimentacao.id_usuario}, ${dadosMovimentacao.quantidade}, '${dadosMovimentacao.data_movimentacao}', ${dadosMovimentacao.id_livro})`
        let result = await prisma.$executeRawUnsafe(sql)
        return result
    } catch (error) {
        return false
    }
}

const selectAllMovimentacoes = async function() {
    try {
        let sql = `select m.*, u.login, l.titulo, t.tipo 
                   from tbl_movimentacao m 
                   inner join tbl_usuario u on m.id_usuario = u.id 
                   inner join tbl_livro l on m.id_livro = l.id 
                   inner join tipo_movimentacao t on m.id_movimentacao = t.id 
                   order by m.id desc`
        let rsMovimentacoes = await prisma.$queryRawUnsafe(sql)
        return rsMovimentacoes
    } catch (error) {
        return false
    }
}

const selectByIdMovimentacao = async function(idMovimentacao) {
    try {
        let sql = `select m.*, u.login, l.titulo, t.tipo 
                   from tbl_movimentacao m 
                   inner join tbl_usuario u on m.id_usuario = u.id 
                   inner join tbl_livro l on m.id_livro = l.id 
                   inner join tipo_movimentacao t on m.id_movimentacao = t.id 
                   where m.id = ${idMovimentacao}`
        let rsMovimentacao = await prisma.$queryRawUnsafe(sql)
        return rsMovimentacao
    } catch (error) {
        return false
    }
}

const selectAllTiposMovimentacao = async function() {
    try {
        let sql = 'select * from tipo_movimentacao order by id'
        let rsTipos = await prisma.$queryRawUnsafe(sql)
        return rsTipos
    } catch (error) {
        return false
    }
}

module.exports = {
    inserirMovimentacao,
    selectAllMovimentacoes,
    selectByIdMovimentacao,
    selectAllTiposMovimentacao
}