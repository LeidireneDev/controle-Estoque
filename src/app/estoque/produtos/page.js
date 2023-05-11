import { listar as getProdutos, buscarPorCodigo } from "@/back-end/produtos";
import { PlusIcon } from "@heroicons/react/20/solid";
import { FolderPlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { ListaDeProdutos } from "./ListaProdutos";

export const revalidate = 1;

export default async function Produtos() {
  const produtos = await getProdutos();

  return (
    <>
      {produtos.length > 0 ? (
        <>
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Produtos
              </h2>
            </div>
            <div className="flex mt-4 md:ml-4 md:mt-0">
              <Link href="estoque/produtos/novo">
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 ml-3 text-sm font-semibold text-white bg-amber-500 rounded-md shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                >
                  <PlusIcon className="-ml-0.5 h-5 w-5" />
                  Cadastrar produto
                </button>
              </Link>
            </div>
          </div>
          <div className="mt-12">
            <ListaDeProdutos produtos={produtos} />
          </div>
        </>
      ) : (
        <EstadoVazio />
      )}
    </>
  );
}

const EstadoVazio = () => (
  <Link href="/estoque/produtos/novo">
    <button
      type="button"
      className="relative block w-full p-12 text-center border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
    >
      <FolderPlusIcon className="w-12 h-12 mx-auto text-gray-400" />
      <span className="block mt-2 text-sm font-semibold text-gray-600">
        Você ainda não tem produtos cadastrados
        <br />
      </span>
      <span className="block mt-2 text-xs font-semibold text-gray-500">
        Clique aqui para cadastrar o primeiro
      </span>
    </button>
  </Link>
);
