Rocketseat - Node.js

Após instalado o Node.js traz por padrão uma série de funcionalidades por padrão, por exemplo: manipulação de arquivos node:fs, criptografia node:crypto, servidores HTTP node:http, etc.

Dentro de node:http consigo importar uma função createServer que é a função mais importante para começarmos a criar o nosso servidor HTTP que é um servidor que pode ser acessado através do navegador.

Iniciamos a criação do nosso servidor utilizando a função createServer e dentro dela posso passar como parâmetro uma outra função que vai receber como parâmetros request e response, ou seja, o request serve exatamente para obter dados da requisição que o usuário está fazendo para o meu servidor HTTP, por exemplo: estou criando a funcionalidade de criação de um novo usuário através do request vou obter os dados para a criação desse usuário como nome, email, senha, ou seja, request traz informações da requisição que está sendo feita para dentro da minha API. Enquanto que o response é o objeto que vou utilizar para devolver uma resposta para quem está chamando a minha API.

-> O response nos traz vários métodos e se quisermos retornar um texto podemos utilizar o método write() que serve para justamente escrever algo na minha resposta.

Após a criação do nosso servidor ele nos devolve um método chamado listen e posso chamar ele passando uma porta para a minha aplicação executar.

Para a criação do arquivo de configurações do nosso projeto package.json posso dar um comando npm init -y, e aqui dentro podemos informar o "type": "module" avisando para o Node.js que estamos utilizando o padrão mais recente de importação.

Nas versões mais recentes do Node.js posso executar a minha aplicação com uma flag --watch e agora toda vez que eu editar o meu arquivo ele já faz um restart automático no meu servidor e caso você não queira ver os avisos basta digitar a flag --no-warnings.

Ao invés de ficarmos digitando o comando node --watch --no-warnings server.js toda vez podemos ir até o nosso arquivo package.json e criar um novo script passando esse comando.


Nos dias atuais é raro a criação de um servidor totalmente em Node.js geralmente utilizamos frameworks que facilitam o nosso desenvolvimento. Além do framework ter a estrutura de criação de um servidor ele vai facilitar com que a gente consiga dividir o nosso servidor em vários endpoints (rotas).

Vamos imaginar que estamos criando uma aplicação de gerenciamento de vídeos então eu quero ter uma rota que eu crio vídeos, por exemplo: http://localhost:3333/videos então nessa rota irei utilizar o método HTTP POST que é o método utilizado na criação de um recurso, posso ter um médoto DELETE para deletar um vídeo http://localhost:3333/videos/1

Então o framework vai ajudar a gente principalmente com essa parte de redirecionar dependendo do endereço que p usuário está acessando para funcionalidades diferentes da nossa aplicação, fora isso ele nos auxilia com a integração com bibliotecas terceiras, envios de email, autenticação, pagamento, etc. Também é um facilitador quando trabalhamos com banco de dados.

Mini-framework Fastify -> um mini-framework traz pouquíssima opinião, ou seja, ele é um framework muito pequeno que traz poucas funcionalidades, coisas que são essenciais para todas as aplicações, para todo o resto ficamos livres para escolher, ou seja, ele não é um framework que vai determinar como é a estrutura de pastas que a gente tem que seguir ou qual a convenção da nomenclatura de arquivos, apenas traz algumas funcionalidades que são comuns a todas as aplicações, por exemplo: roteamento.


CRUD - Create, Read, Update, Delete -> operações básicas que podemos fazer em uma entidade da nossa aplicação, por exemplo: se estou construindo uma API que ela gerencia vídeos vou precisar realizar essas quatro operações básicas - fazer upload de vídeos (cadastrar vídeos), listar vídeos, alterar vídeos (editar título, descrição), deletar vídeos.


Protocolo HTTP -> dentro do protocolo existem vários métodos que são formas de diferenciar semânticamente, ou seja, de acordo com o significado, as ações que a gente faz em uma API então quando utilizamos o GET estamos utilizando um método HTTP GET que é utilizado quando eu quero fazer uma operação na minha aplicação quando eu busco alguma informação fazemos isso geralmente para listagens, obter algum detalhe, mas existem outros métodos que também podemos utilizar no seu lugar como POST que é utilizado para criação, ou seja, quando eu quero criar um registro, o PUT que é para alteração, DELETE que é para deletar esses são os quatro mais conhecidos, mas existem outros como o PATCH que eu posso utilizar quando eu quero alterar apenas uma informação específica de um recurso e não todos os dados, por exemplo: imagina que estamos em um vídeo e eu gostaria de alterar se ele é público ou privado.

Uma coisa interessante que quando estamos criando uma API eu posso ter o mesmo endereço/recurso http://localhost:3333/videos com métodos HTTP diferentes.

Uma coisa muito importante quando eu vou atualizar, no nosso caso um vídeo, vou sempre estar atualizando um único vídeo e por isso na nossa rota a gente recebe o id do vídeo que queremos atualizar ou algum tipo de identificar único, geralmente o id. E esse id é identificado por algo que chamamos de Route Parameter que é basicamente um parâmetro enviado na rota e identificamos ele dentro do Fastify com :nome, por exemplo: :id

Na rota DELETE segue a mesma lógica da nossa rota PUT, ou seja, quando eu quero deletar um vídeo vou estar sempre deletando um vídeo específico e por isso preciso receber o id.


Banco de Dados em Memória -> quando salvo uma informação na memória da minha aplicação, ou seja, numa variável. A desvantagem é que quando eu reiniciar a minha aplicação todos os dados serão perdidos, a vantagem é a facilidade de testar muito mais rápido a minha aplicação e acelerar o seu desenvolvimento.

Para isso vou criar uma classe, exportar e importar ela para dentro da minha aplicação. Dentro do meu banco de dados vou começar criando uma chave privada aqui dentro e por isso a #, ou seja, essa informação só vai ser visível por dentro dessa classe onde ela irá armazenar os nossos vídeos.

Criaremos alguns métodos para manusearmos esses vídeos.

Existem duas estruturas de dados em JavaScript que podemos utilizar que seriam o Set e o Map, o Set é como se fosse um Array no JavaScript, porém o grande diferencial dele é que ele não aceita valores duplicados. O Map é como se fosse um Objeto no JavaScript, mas com algumas particularidades e uma das coisas é que ele possui uma API, ou seja, uma forma da gente trabalhar com ele diferente do que a gente trabalha com Objetos.

Vamos trabalhar com o Map, dentro do Map eu tenho algumas funcionalidades como por exemplo: o método set() que serve para eu adicionar uma informação dentro do meu Map, esse método recebe dois parâmetros -> chave, que no nosso caso vai ser o id do vídeo, e o valor, ou seja, para esse id do vídeo aqui estão as informações do vídeo.

Então quando eu criar um vídeo no meu banco de dados em memória eu vou gerar para ele um id aleatório e para isso eu posso utilizar um método que vem de dentro do módulo de node:crypto que é o randomUUID()

UUID -> Unique Universal ID, basicamente é um id único universal, ou seja, ele sempre vai me retornar um id único

Finalizado o nosso banco de dados em memória iremos agora fazer a implementação das nossas rotas.


Request Body -> enviar dados diferentes para o meu backend, ou seja, toda vez que eu utilizo os métodos POST e PUT eu posso enviar um corpo para a requisição, o corpo geralmente é onde enviamos os dados de um formulário, por exemplo.

Para acessar esses dados vou criar uma variável e passar request.body

Como estou criando uma API REST eu quero enviar os dados para essa API em formato convencional da WEB que é o JSON por isso estou passando um objeto.

Quando eu faço uma requisição do meu frontend para o meu backend eu preciso falar para o backend qual que é o formato dos dados que estou enviando, ou seja, se estou enviando um JSON o frontend precisa informar que o tipo do conteúdo que estou te enviando é do tipo application/json

Esse Content-type estou enviando no cabeçalho da requisição, o cabeçalho que são essas informações que tanto posso enviar na hora que estou fazendo uma requisição quanto também eu recebo na hora que estou recebendo uma resposta daquela requisição são metadados da requisição, ou seja, metadados pense como estou criando um vídeo quais são as informações para criar o vídeo: título, descrição, duração, isso vai no corpo da requisição, se eu precisar enviar alguma informação que não necessariamente tem a ver com o vídeo que estou querendo criar, mas que é importante para aquela requisição eu envio nos metadados.

Nos metadados eu posso enviar, geralmente os sistemas utilizam os metadados quando o sistema ele é multi-idioma, imagina que o nosso backend pode retornar um erro, vamos supor: o vídeo que estamos criando tem o título muito pequeno, essa mensagem de erro precisa vir internacionalizada de acordo com o país que o usuário está acessando então podemos enviar um metadado no cabeçalho falando qual que é o idioma Accept-Language do usuário, por exemplo: português, então nosso backend já sabe que ele precisa devolver a mensagem em português. Em resumo eles seriam essas configurações que a gente pode fazer na requisição.


Diferentes formas de enviar dados da nossa requisição para dentro do nosso backend -> 

* Corpo da requisição: geralmente utilizado quando estou enviando dados para criação de um novo registro, atualizando um registro;
  
* Parâmetros na rota: geralmente utilizado para identificar um recurso na hora de atualizar ou deletar e esses parâmetros são sempre obrigatórios naquela rota;
  
* Query Parameters/Search Parameters: são utilizados para a gente identificar informações que são opcionais e geralmente utilizadas para filtrar os dados ou fazer algum tipo de paginação então esses query parameters geralmente são utilizados em rotas de listagem de dados para a gente fazer algum tipo de busca, filtro, paginação, ordenação, ou seja, uma forma de modificar o retorno dado pelo backend mas não são parâmetros obrigatórios.


Integrando um banco de dados na nossa aplicação - PostgreSQL

Para utilizarmos o PostgreSQL dentro da nossa aplicação a gente precisa de um banco de dados e esse banco de dados você pode executar de qualquer forma

Para isso podemos utilizar um serviço online chamado Neon

Instalamos a biblioteca npm install postgres

Dentro de aplicações backend a gente tem um conceito que usamos que chamamos de variáveis de ambiente. As variáveis de ambiente são variáveis, geralmente, que são segredo, ou seja, credenciais sensíveis por exemplo: acesso ao banco de dados. E principalmente variáveis que a gente quer que sejam diferentes enquanto a minha aplicação estiver em desenvolvimento e quando ela estiver em produção, por exemplo: banco de dados - quando eu estiver desenvolvendo a minha aplicação provavelmente vou ter vários registros testes, quando eu colocar a minha aplicação em produção já é outro banco de dados, então veja que eu preciso de conexões diferentes quando o meu projeto estiver rodando em desenvolvimento e em produção e configuramos isso através das variáveis de ambiente.

Para isso criamos um arquivo .env que irá as variáveis que eu quero que sejam diferentes para cada tipo de ambiente.

Instalaremos uma biblioteca chamada dotenv com o comando npm i dotenv -D, de forma temporária já que o Node.js está incluindo em sua versão 20 o suporte as variáveis de ambiente, mas como estamos utilizando a versão LTS 18x precisamos fazer a instalação.

process.env -> variável global do Node.js onde serão salvas as nossas variáveis de ambiente

Criando tabelas no banco de dados

Podemos criar um arquivo .js para criarmos as nossas tabelas no nosso banco de dados. 

Importamos o nosso sql de dentro do nosso db.js e passamos comandos SQL para a criação das tabelas utilizando template strings ``.

Como precisamos aguardar um tempo para a sua criação podemos passar .then(() => console.log('Tabela criada!)) como forma de exemplo sinalizando que o processo foi finalizado.

Após criadas as tabelas podemos criar o nosso arquivo database-postgres.js e esse arquivo vai ser exatamente igual o nosso database-memory, porém ele irá fazer as operações diretamente em um banco.


Deploy do projeto

Para isso podemos utilizar o render