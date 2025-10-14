import mariadb from 'mariadb'

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: '153624',
  database: 'gas',
  connectionLimit: 5
})

export default pool