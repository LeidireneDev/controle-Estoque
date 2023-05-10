import { listar as getFornecedores } from "@/back-end/fornecedores";
import { PlusIcon } from "@heroicons/react/20/solid";
import { FolderPlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { ListaDeFornecedores } from "./ListaFornecedores";

export const revalidate = 1;

export default async function Fornecedores() {
  const fornecedores = await getFornecedores();

  return (
    <>
      {fornecedores.length > 0 ? (
        <>
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Fornecedores
              </h2>
            </div>
            <div className="flex mt-4 md:ml-4 md:mt-0">
              <Link href="estoque/fornecedores/novo">
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 ml-3 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <PlusIcon className="-ml-0.5 h-5 w-5" />
                  Cadastrar fornecedor
                </button>
              </Link>
            </div>
          </div>
          <div className="mt-12">
            <ListaDeFornecedores fornecedores={fornecedores} />
          </div>
        </>
      ) : (
        <EstadoVazio />
      )}
    </>
  );
}

const EstadoVazio = () => (
  <Link href="/estoque/fornecedores/novo">
    <button
      type="button"
      className="relative block w-full p-12 text-center border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <FolderPlusIcon className="w-12 h-12 mx-auto text-gray-400" />
      <span className="block mt-2 text-sm font-semibold text-gray-600">
        Você ainda não tem fornecedores cadastrados
        <br />
      </span>
      <span className="block mt-2 text-xs font-semibold text-gray-500">
        Clique aqui para cadastrar o primeiro
      </span>
    </button>
  </Link>
);
