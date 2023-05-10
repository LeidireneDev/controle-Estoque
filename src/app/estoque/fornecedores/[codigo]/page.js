import * as fornecedores from "@/back-end/fornecedores";
import { buscarPorFornecedor } from "@/back-end/produtos";

import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ButtonExcluirFornecedor } from "./ButtonExcluirFornecedor";
import { ListaDeProdutos } from "../../produtos/ListaProdutos";

export const revalidate = 1;

export default async function EditarFornecedor({ params, searchParams }) {
  const { codigo } = params;

  let dados = await fornecedores.buscarPorCodigo(codigo);
  let produtosDoFornecedor = await buscarPorFornecedor(codigo);
  console.log(produtosDoFornecedor);

  return (
    <>
      <form action={atualizarFornecedor}>
        <input type="hidden" name="codigo" value={codigo}></input>
        <div className="max-w-2xl px-4 mx-auto sm:px-6 lg:px-8">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Editar Fornecedor {codigo}
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Altere os dados do fornecedor
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
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end px-4 sm:px-0">
            <div className="flex flex-1 w-0 -mt-px">
              <ButtonExcluirFornecedor codigo={codigo} />
            </div>
            <div className="flex items-center justify-end mt-6 gap-x-6">
              <Link href="/estoque/fornecedores">
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Cancelar
                </button>
              </Link>
              <button
                type="submit"
                className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="max-w-2xl px-4 mx-auto mt-16 sm:px-6 lg:px-8">
        <div className="mb-8 ">
          <h2 className="mt-16 text-base font-semibold leading-7 text-gray-900">
            Produtos do fornecedor
          </h2>
        </div>
        <ListaDeProdutos produtos={produtosDoFornecedor} />
      </div>
    </>
  );
}

async function atualizarFornecedor(formData) {
  "use server";

  const dados = Object.fromEntries(formData);

  await fornecedores.alterar(dados);

  revalidatePath(`/estoque/fornecedores/${dados.codigo}`);
  revalidatePath(`/estoque/fornecedores`);

  redirect("/estoque/fornecedores");
}
