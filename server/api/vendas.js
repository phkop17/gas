import pool from '../utils/db'

export default defineEventHandler(async (event) => {
  try {
    const conn = await pool.getConnection()
    const rows = await conn.query(`
      SELECT
        v.id as id,
        v.cliente_cidade AS cidade,
        v.criado_em AS data,
        v.cliente_nome AS cliente,
        v.cliente_telefone AS telefone,
        ve.nome AS vendedor
      FROM
        vendas v
        LEFT JOIN vendedores ve ON (v.id_vendedor = ve.id)
    `)
    conn.release()
    return rows
  } catch (err) {
    console.error('Erro ao consultar o banco:', err)
    return { error: 'Erro ao acessar o banco de dados' }
  }
})