import pool from '../../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { nome, telefone, cidade } = body

  if (!nome || !telefone || !cidade) {
    return { error: 'Todos os campos são obrigatórios.' }
  }

  try {
    const conn = await pool.getConnection()
    const result = await conn.query(
      'INSERT INTO vendedores (nome, telefone, cidade) VALUES (?, ?, ?)',
      [nome, telefone, cidade]
    )
    conn.release()

    return { success: true, id: result.insertId }
  } catch (err) {
    console.error('Erro ao inserir vendedor:', err)
    return { error: 'Erro ao cadastrar vendedor.' }
  }
})