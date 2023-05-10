import { produtosComBaixoEstoque } from "@/back-end/relatorios";
import ProdutosComBaixoEstoque from "./ProdutosComBaixoEstoque";

export default async function ListaProdutosComBaixoEstoque() {
  const produtos = await produtosComBaixoEstoque();

  return (
    <>
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Relatórios
          </h2>
        </div>
      </div>
      <div className="mt-12">
        <ProdutosComBaixoEstoque produtos={produtos} />
      </div>
    </>
  );
}
