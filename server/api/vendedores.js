import pool from '../utils/db'

export default defineEventHandler(async (event) => {
  try {
    const conn = await pool.getConnection()
    const rows = await conn.query('SELECT * FROM vendedores')
    conn.release()
    return rows
  } catch (err) {
    console.error('Erro ao consultar o banco:', err)
    return { error: 'Erro ao acessar o banco de dados' }
  }
})