import * as produtos from "@/back-end/produtos";
import { MoneyInput } from "@/components/MoneyInput";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ButtonExcluirProduto } from "./ButtonExcluirProduto";

export const revalidate = 1;

export default async function EditarProduto({ params, searchParams }) {
  const { codigo } = params;

  let dados = !!searchParams?.dados && JSON.parse(searchParams.dados);
  const erros = !!searchParams?.erros && JSON.parse(searchParams.erros);

  if (!dados) {
    dados = await produtos.buscarPorCodigo(codigo);
  }

  return (
    <>
      <form action={atualizarProduto}>
        <input type="hidden" name="codigo" value={codigo}></input>
        <div className="max-w-2xl px-4 mx-auto sm:px-6 lg:px-8">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Editar Produto {codigo}
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Altere os dados do produto
          </p>

          <div className="pb-12 border-b border-gray-900/10">
            <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="nome"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nome
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="nome"
                    id="nome"
                    required
                    defaultValue={dados?.nome}
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:text-sm sm:leading-6${
                      erros.nome ? " border-red-600" : ""
                    }`}
                  />
                </div>
                {erros.nome && (
                  <p className="mt-1 text-xs text-red-600">{erros.nome}</p>
                )}
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="descricao"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Descrição
                </label>
                <div className="mt-2">
                  <textarea
                    id="descricao"
                    name="descricao"
                    type="text"
                    rows="3"
                    defaultValue={dados?.descricao}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="fornecedor"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Fornecedor
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="fornecedor"
                    id="fornecedor"
                    defaultValue={dados?.fornecedor}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <MoneyInput
                  name="preco"
                  label="Preço"
                  defaultValue={dados?.preco}
                  hasError={!!erros.preco}
                  required
                />
                {erros.preco && (
                  <p className="mt-1 text-xs text-red-600">{erros.preco}</p>
                )}
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="quantidade"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Quantidade
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="quantidade"
                    id="quantidade"
                    defaultValue={dados?.quantidade}
                    required
                    min="0"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end px-4 sm:px-0">
            <div className="flex flex-1 w-0 -mt-px">
              <ButtonExcluirProduto codigo={codigo} />
            </div>
            <div className="flex items-center justify-end mt-6 gap-x-6">
              <Link href="/estoque/produtos">
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Cancelar
                </button>
              </Link>
              <button
                type="submit"
                className="px-3 py-2 text-sm font-semibold text-white bg-amber-400 rounded-md shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </form>
      {/* <script>document.location.reload(true);</script> */}
    </>
  );
}

async function atualizarProduto(formData) {
  "use server";

  const dados = Object.fromEntries(formData);

  const resultado = await produtos.alterar(dados);

  if (resultado && "erros" in resultado) {
    const erros = JSON.stringify(resultado.erros);
    const dadosString = JSON.stringify(dados);

    return redirect(
      `/estoque/produtos/${codigo}?erros=${erros}&dados=${dadosString}`
    );
  }

  revalidatePath(`/estoque/produtos/${dados.codigo}`);
  revalidatePath(`/estoque/produtos`);

  redirect("/estoque/produtos");
}
