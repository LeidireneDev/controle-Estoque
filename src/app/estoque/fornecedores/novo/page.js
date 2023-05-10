import * as fornecedores from "@/back-end/fornecedores";

import Link from "next/link";
import { redirect } from "next/navigation";

async function salvarFornecedor(formData) {
  "use server";

  const dados = Object.fromEntries(formData);

  await fornecedores.cadastrar(dados);

  redirect("/estoque/fornecedores");
}

function NovoFornecedor() {
  return (
    <form action={salvarFornecedor}>
      <div className="max-w-2xl px-4 mx-auto sm:px-6 lg:px-8">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Novo Fornecedor
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Cadastre um novo fornecedor
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
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end px-4 sm:px-0">
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
  );
}

export default NovoFornecedor;
