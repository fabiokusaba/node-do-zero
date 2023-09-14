// Utilizando Node.js
// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//   response.write('hello world!')

//   return response.end()
// })

// server.listen(3333)

//Reescrevendo utilizando Fastify
import { fastify } from "fastify"
//import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

//POST http://localhost:3333/videos
//PUT http://localhost:3333/videos/1

//Route Parameter

//Criando o nosso banco de dados
//const database = new DatabaseMemory()
const database = new DatabasePostgres()

//Request Body

server.post('/videos', async (request, reply) => {
  //Pegando os dados do corpo da requisição e fazendo uma desestruturação para capturá-los
  const { title, description, duration } = request.body
  
  //Adicionando um novo vídeo no banco de dados
  await database.create({
    //Em JavaScript quando o nome da chave do objeto é igual ao nome que estou passando para o valor posso utilizar a short sintax
    title,
    description,
    duration
  })

  return reply.status(201).send()
})

server.get('/videos', async (request, reply) => {
  const videos = await database.list()

  //Quando eu só quero retornar alguma coisa de dentro de uma rota sem mudar o status nem nada eu posso só retornar aquilo diretamente que o Fastify irá tratar isso pra gente
  return videos
})

server.get('/videossearch', async (request, reply) => {
  const search = request.query.search

  const videos = await database.list(search)

  return videos
})

server.put('/videos/:id', async (request, reply) => {
  //Pegando o id do vídeo que eu quero alterar
  const videoId = request.params.id

  //Pegando do corpo da requisição as informações que eu quero atualizar daquele recurso
  const { title, description, duration } = request.body


  await database.update(videoId, {
    title,
    description,
    duration,
  })

  return reply.status(204).send()
})

server.delete("/videos/:id", async (request, reply) => {
  //Pegando o id do vídeo que eu quero deletar
  const videoId = request.params.id

  await database.delete(videoId)

  return reply.status(204).send()
})

server.listen({
  port: process.env.PORT ?? 3333,
})