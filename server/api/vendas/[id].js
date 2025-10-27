import pool from '../../utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  
  try {
    const conn = await pool.getConnection()

    const rows = await conn.query(`
      SELECT
        v.*
      FROM
        vendas v
      WHERE
        v.id = ${id}
      ORDER BY
        v.criado_em DESC
    `)
    conn.release()
    return rows
  } catch (err) {
    console.error('Erro ao consultar o banco:', err)
    return { error: 'Erro ao acessar o banco de dados' }
  }
})