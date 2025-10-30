/************************************************************************************
 * Objetivo: API responsável pelo sistema de biblioteca LionBook
 * Data: 13/02/2025
 * Autor: João Pedro
 * Versão: 1.0
 *****************************************************************************/

const express    = require('express')
const cors       = require('cors')
const bodyParser = require('body-parser')

const controllerLivro           = require('./controller/livro/controllerLivro.js')
const controllerUsuario         = require('./controller/usuario/controllerUsuario.js')
const controllerMovimentacao    = require('./controller/movimentacao/controllerMovimentacao.js')

//Criando o formato de dados que será recebido no body da requisição(POST/PUT)
const bodyParserJSON = bodyParser.json()

//Cria o objeto app para criar a api
const app = express()

//Configurações do CORS
app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin','*')
    response.header('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()
})
 
//LIVROS
app.post('/v1/lionbook/livro', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let result = await controllerLivro.inserirLivro(dadosBody, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/lionbook/livro', cors(), async function(request, response) {
    let result = await controllerLivro.listarLivro()
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/lionbook/livro/:id', cors(), async function(request, response){
    let idLivro = request.params.id
    let result = await controllerLivro.buscarLivro(idLivro)
    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/lionbook/livro/:id', cors(), async function (request, response){
    let idLivro = request.params.id
    let result = await controllerLivro.excluirLivro(idLivro)
    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/lionbook/livro/:id', cors(), bodyParserJSON, async function (request, response){
    let contentType = request.headers['content-type']
    let idLivro = request.params.id
    let dadosBody = request.body
    let result = await controllerLivro.atualizarLivro(dadosBody, idLivro, contentType)
    response.status(result.status_code)
    response.json(result)
})

//USUARIOS
app.post('/v1/lionbook/usuario', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let result = await controllerUsuario.inserirUsuario(dadosBody, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/lionbook/usuario', cors(), async function(request, response) {
    let result = await controllerUsuario.listarUsuario()
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/lionbook/usuario/:id', cors(), async function(request, response){
    let idUsuario = request.params.id
    let result = await controllerUsuario.buscarUsuario(idUsuario)
    response.status(result.status_code)
    response.json(result)
})

//MOVIMENTACOES
app.post('/v1/lionbook/movimentacao', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let result = await controllerMovimentacao.inserirMovimentacao(dadosBody, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/lionbook/movimentacao', cors(), async function(request, response) {
    let result = await controllerMovimentacao.listarMovimentacao()
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/lionbook/tipos-movimentacao', cors(), async function(request, response) {
    let result = await controllerMovimentacao.listarTiposMovimentacao()
    response.status(result.status_code)
    response.json(result)
})





app.listen(8080, function(){
    console.log('Servidor aguardando novas requisições...')
})