import pool from '../../utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    return { error: 'ID não informado' }
  }

  try {
    const conn = await pool.getConnection()
    const result = await conn.query('DELETE FROM vendas WHERE id = ?', [id])
    conn.release()

    return { success: true, affectedRows: result.affectedRows }
  } catch (err) {
    console.error('Erro ao deletar registro:', err)
    return { error: 'Erro ao deletar registro' }
  }
})