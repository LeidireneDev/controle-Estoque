import {
  cadastrar,
  alterar,
  excluir,
  listar,
  buscarPorCodigo,
} from "./produtos.js";

// Teste 1: Testar a função "cadastrar" para adicionar um novo produto.
function testCadastrarAdicionarProduto() {
  const novoProduto = {
    nome: "Produto de Teste",
    descricao: "Descrição do Produto de Teste",
    fornecedor: "Fornecedor de Teste",
    preco: 10.5,
    quantidade: 5,
  };

  const resultado = cadastrar(novoProduto);

  if (resultado.nome !== novoProduto.nome) {
    console.error("O nome do produto não foi definido corretamente.");
  }

  if (resultado.descricao !== novoProduto.descricao) {
    console.error("A descrição do produto não foi definida corretamente.");
  }

  if (resultado.fornecedor !== novoProduto.fornecedor) {
    console.error("O fornecedor do produto não foi definido corretamente.");
  }

  if (resultado.preco !== novoProduto.preco) {
    console.error("O preço do produto não foi definido corretamente.");
  }

  if (resultado.quantidade !== novoProduto.quantidade) {
    console.error("A quantidade do produto não foi definida corretamente.");
  }

  if (!resultado.codigo) {
    console.error("O código do produto não foi gerado corretamente.");
  }
}

// Teste 2: Testar a função "cadastrar" para validar um novo produto com informações inválidas.
function testCadastrarValidarProdutoInvalido() {
  const novoProduto = {
    nome: "",
    descricao: "Descrição do Produto de Teste",
    fornecedor: "Fornecedor de Teste",
    preco: 0,
    quantidade: -5,
  };

  const resultado = cadastrar(novoProduto);

  if (!resultado.erros.nome) {
    console.error("O nome do produto não foi validado corretamente.");
  }

  if (!resultado.erros.preco) {
    console.error("O preço do produto não foi validado corretamente.");
  }

  if (!resultado.erros.quantidade) {
    console.error("A quantidade do produto não foi validada corretamente.");
  }
}

// Teste 3: Testar a função "listar" para retornar uma lista vazia de produtos.
function testListarListaVazia() {
  const resultado = listar();

  if (resultado.size !== 0) {
    console.error("A lista de produtos não está vazia.");
  }
}

// Teste 4: Testar a função "alterar" para atualizar um produto existente.
function testAlterarAtualizarProdutoExistente() {
  const produtoExistente = {
    nome: "Produto Existente",
    descricao: "Descrição do Produto Existente",
    fornecedor: "Fornecedor Existente",
    preco: 20.75,
    quantidade: 10,
  };

  cadastrar(produtoExistente);

  const produtoAtualizado = {
    codigo: produtoExistente.codigo,
    nome: "Produto Atualizado",
    descricao: "Nova Descrição do Produto Atualizado",
    fornecedor: "Novo Fornecedor Atualizado",
    preco: 25.5,
    quantidade: 15,
  };

  const resultado = alterar(produtoAtualizado);

  if (!resultado.has(produtoAtualizado)) {
    console.error("O produto não foi atualizado corretamente.");
  }

  if (resultado.has(produtoExistente)) {
    console.error("O produto antigo ainda está na lista.");
  }
}

// Teste 5: Testar a função "excluir" para remover um produto existente.
function testExcluirRemoverProdutoExistente() {
  const produtoExistente = {
    nome: "Produto Existente",
    descricao: "Descrição do Produto Existente",
    fornecedor: "Fornecedor Existente",
    preco: 20.75,
    quantidade: 10,
  };

  cadastrar(produtoExistente);

  const resultado = excluir({ codigo: produtoExistente.codigo });

  if (resultado === false) {
    console.error("O produto não foi excluído corretamente.");
  }

  if (buscarPorCodigo(produtoExistente.codigo)) {
    console.error("O produto ainda está na lista após a exclusão.");
  }
}

testListarListaVazia();
testCadastrarAdicionarProduto();
testCadastrarValidarProdutoInvalido();
testAlterarAtualizarProdutoExistente();
testExcluirRemoverProdutoExistente();
