import { randomUUID } from "node:crypto"

export class DatabaseMemory {
  #videos = new Map()

  list(search) {
    //Encapsulando o método colocando dentro de uma função Array.from() que irá converter uma estrutura de dados que não é um Array para um Array
    //Como estamos retornando um Array de vários Arrays eu posso usar o método map() que serve para eu percorrer um Array e fazer algum tipo de modificação.
    //Dentro do meu videoArray na primeira posição eu tenho o id do vídeo e na segunda posição eu tenho as informações do vídeo.
    //Agora vou retornar daqui de dentro um objeto contendo o id do vídeo e todas as demais informações utilizando o spread operator ...data
    return Array.from(this.#videos.entries())
    .map((videoArray) => {
      const id = videoArray[0]
      const data = videoArray[1]

      return {
        id,
        ...data,
      }
    })
    //O filter() vai receber cada um dos vídeos e se eu tiver uma busca eu quero retornar somente os vídeos em que o título inclui a palavra que foi escrita em search
    //Se não tiver uma busca retorna true, ou seja, todos os vídeos
    .filter(video => {
      if (search) {
        return video.title.includes(search)
      }

      return true
    })
  }

  create(video) {
    const videoId = randomUUID()

    this.#videos.set(videoId, video)
  }

  update(id, video) {
    this.#videos.set(id, video)
  }

  delete(id) {
    this.#videos.delete(id)
  }
}