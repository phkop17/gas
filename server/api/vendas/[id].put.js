import pool from '../../utils/db'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params
  const body = await readBody(event)
  let { id_vendedor, cliente_nome, cliente_telefone, cliente_cidade, data_venda } = body

  if (!id_vendedor || !cliente_nome || !cliente_telefone || !cliente_cidade || !data_venda) {
    return { error: 'Todos os campos são obrigatórios.' }
  }

  data_venda = new Date(data_venda).toISOString().split('T')[0]

  try {
    const conn = await pool.getConnection()
    const result = await conn.query(
      `UPDATE
        vendas
      SET
        id_vendedor = ?,
        cliente_nome = ?,
        cliente_telefone = ?,
        cliente_cidade = ?,
        data_venda = ?
      WHERE
        id = ?`,
      [id_vendedor, cliente_nome, cliente_telefone, cliente_cidade, data_venda, id]
    )
    conn.release()

    return { success: true, id: String(result.insertId) }
  } catch (err) {
    return err
    console.error('Erro ao inserir venda:', err)
    return { error: 'Erro ao cadastrar venda.' }
  }
})