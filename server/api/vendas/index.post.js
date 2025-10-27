import pool from '../../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  let { id_vendedor, cliente_nome, cliente_telefone, cliente_cidade, data_venda } = body
  data_venda = new Date(data_venda).toISOString().split('T')[0]

  if (!id_vendedor || !cliente_nome || !cliente_telefone || !cliente_cidade || !data_venda) {
    return { error: 'Todos os campos são obrigatórios.' }
  }

  try {
    const conn = await pool.getConnection()
    const result = await conn.query(
      'INSERT INTO vendas (id_vendedor, cliente_nome, cliente_telefone, cliente_cidade, data_venda) VALUES (?, ?, ?, ?, ?)',
      [id_vendedor, cliente_nome, cliente_telefone, cliente_cidade, data_venda]
    )
    conn.release()

    return { success: true, id: String(result.insertId) }
  } catch (err) {
    return err
    console.error('Erro ao inserir venda:', err)
    return { error: 'Erro ao cadastrar venda.' }
  }
})