import { sql } from "@vercel/postgres";

const cadastrar = async ({
  nome,
  descricao,
  fornecedor,
  preco,
  quantidade,
}) => {
  const novoProduto = { nome, descricao, fornecedor, preco, quantidade };

  const precoNumerico = brlToFloat(preco);

  const validacao = validar(novoProduto);

  if (Object.keys(validacao.erros).length > 0) return validacao;

  const { rows } = await sql`
      INSERT INTO produtos (nome, descricao, fornecedor, preco, quantidade)
      VALUES (${nome}, ${descricao}, ${fornecedor}, ${precoNumerico}, ${quantidade})
      RETURNING codigo
    `;

  novoProduto.codigo = rows[0]?.codigo;

  return novoProduto;
};

const buscarPorCodigo = async (codigo) => {
  const { rows } = await sql`
    SELECT p.*, f.nome as nome_fornecedor
    FROM produtos p
    LEFT JOIN fornecedores f ON p.fornecedor = f.codigo
    WHERE p.codigo = ${codigo};
  `;

  return rows[0];
};

const listar = async () => {
  const { rows } = await sql`
    SELECT p.*, f.nome as nome_fornecedor
    FROM produtos p
    LEFT JOIN fornecedores f ON p.fornecedor = f.codigo
    ORDER BY p.nome;
  `;

  return rows;
};

const alterar = async ({
  codigo,
  nome,
  descricao,
  fornecedor,
  preco,
  quantidade,
}) => {
  const precoNumerico = brlToFloat(preco);

  const validacao = validar({
    nome,
    preco,
    quantidade,
  });

  // if (Object.keys(validacao.erros).length > 0) return validacao;

  await sql`
    UPDATE produtos SET
      nome = ${nome},
      descricao = ${descricao},
      fornecedor = ${fornecedor},
      preco = ${precoNumerico},
      quantidade = ${quantidade}
    WHERE codigo = ${codigo}
  `;
};

const excluir = async ({ codigo }) => {
  const { rowCount } = await sql`DELETE FROM produtos WHERE codigo = ${codigo}`;

  return rowCount === 1;
};

const validar = ({ nome, preco, quantidade }) => {
  const precoNumerico = brlToFloat(preco);

  let resultado = { erros: {} };

  if (nome === "") {
    resultado.erros.nome = "O nome do produto não pode estar em branco.";
  }

  if (quantidade < 0) {
    resultado.erros.quantidade =
      "A quantidade do produto não pode ser negativa.";
  }

  // Verificando se os campos preco e quantidade são números:
  if (isNaN(parseFloat(precoNumerico))) {
    resultado.erros.preco = "Preço do produto deve ser um número válido.";
  }

  if (precoNumerico <= 0.0) {
    resultado.erros.preco = "O preço do produto deve ser maior que R$ 0,00.";
  }

  if (isNaN(parseInt(quantidade))) {
    resultado.erros.quantidade =
      "Quantidade do produto deve ser um número inteiro válido.";
  }

  return resultado;
};

const buscarPorFornecedor = async (fornecedor) => {
  const { rows } = await sql`
    SELECT p.*, f.nome as nome_fornecedor
    FROM produtos p
    LEFT JOIN fornecedores f ON p.fornecedor = f.codigo
    WHERE f.codigo = ${fornecedor};
  `;

  return rows;
};

function brlToFloat(brlValue) {
  return parseFloat(brlValue?.replace(".", "").replace(",", "."));
}

export {
  cadastrar,
  buscarPorCodigo,
  buscarPorFornecedor,
  listar,
  alterar,
  excluir,
};
