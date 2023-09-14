import 'dotenv/config'
import postgres from  'postgres'

//Lendo as variáveis de ambiente
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env

//Criando uma URL de conexão com o banco de dados
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`

export const sql = postgres(URL, { ssl: "require" })