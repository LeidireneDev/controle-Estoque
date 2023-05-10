import { sql } from "@vercel/postgres";

const cadastrar = async ({ nome }) => {
  const novoFornecedor = { nome };

  const { rows } = await sql`
    INSERT INTO fornecedores (nome)
    VALUES (${nome})
    RETURNING codigo
  `;

  novoFornecedor.codigo = rows[0]?.codigo;

  return novoFornecedor;
};

const buscarPorCodigo = async (codigo) => {
  const { rows } = await sql`
    SELECT * FROM fornecedores
    WHERE codigo = ${codigo};
  `;

  return rows[0];
};

const listar = async () => {
  const { rows } = await sql`
    SELECT * FROM fornecedores
    ORDER BY nome;
  `;

  return rows;
};

const alterar = async ({ codigo, nome }) => {
  await sql`
    UPDATE fornecedores SET
      nome = ${nome}
    WHERE codigo = ${codigo}
  `;
};

const excluir = async ({ codigo }) => {
  const { rowCount } =
    await sql`DELETE FROM fornecedores WHERE codigo = ${codigo}`;

  return rowCount === 1;
};

export { cadastrar, buscarPorCodigo, listar, alterar, excluir };
