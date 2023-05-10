import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";

const cadastrar = async ({ nome, email, senha }) => {
  const novoUsuario = { nome, email };

  const senhaHash = await bcrypt.hash(senha, 10);

  const { rows } = await sql`
    INSERT INTO usuario (nome, email, senha)
    VALUES (${nome}, ${email}, ${senhaHash})
    RETURNING id
  `;

  novoUsuario.id = rows[0]?.id;

  return novoUsuario;
};

const buscarPorId = async (id) => {
  const { rows } = await sql`
    SELECT id, nome, email FROM usuario
    WHERE id = ${id};
  `;

  return rows[0];
};

const listar = async () => {
  const { rows } = await sql`
    SELECT id, nome, email FROM usuario
    ORDER BY nome;
  `;

  return rows;
};

const alterar = async ({ id, nome, email, senha }) => {
  const senhaHash = await bcrypt.hash(senha, 10);

  await sql`
    UPDATE usuario SET
      nome = ${nome},
      email = ${email},
      senha = ${senhaHash}
    WHERE id = ${id}
  `;
};

const excluir = async ({ id }) => {
  const { rowCount } = await sql`DELETE FROM usuario WHERE id = ${id}`;

  return rowCount === 1;
};

const autenticar = async ({ email, senha }) => {
  const { rows } = await sql`
    SELECT * FROM usuario
    WHERE email = ${email};
  `;

  const usuario = rows[0];

  if (!usuario) {
    return { erro: "Usuário não encontrado." };
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);

  if (!senhaValida) {
    return { erro: "Senha incorreta." };
  }

  return { id: usuario.id, nome: usuario.nome, email: usuario.email };
};

export { cadastrar, buscarPorId, listar, alterar, excluir, autenticar };
