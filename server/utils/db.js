import mariadb from 'mariadb'

const pool = mariadb.createPool({
  host: 'cloud.exatasoftware.com',
  port: 33089,
  user: 'deivis',
  password: 'dalmzi22',
  database: 'automacao_andergas',
  connectionLimit: 5
})

export default pool