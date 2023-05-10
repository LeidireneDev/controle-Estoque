"use client";

import { ModalConfirmacao } from "@/components/ModalConfirmacao";
import { excluirFornecedor } from "./excluir-fornecedor.action";

import { TrashIcon } from "@heroicons/react/24/outline";
import { useState, useTransition } from "react";

export function ButtonExcluirFornecedor({ codigo }) {
  const [confirma, setConfirma] = useState(false);
  let [isPending, startTransition] = useTransition();

  return (
    <>
      <button
        type="button"
        onClick={() => setConfirma(true)}
        className="inline-flex items-center pt-4 pr-1 text-sm font-semibold text-gray-500 border-t-2 border-transparent hover:text-rose-600 group "
      >
        <TrashIcon className="w-5 h-5 mr-3 text-gray-500 group-hover:text-rose-600 " />
        Excluir fornecedor
      </button>

      <ModalConfirmacao
        title={`Excluir fornecedor #${codigo}`}
        message={"Quer mesmo excluir este fornecedor?"}
        primaryAction={{
          label: "Excluir",
          action: () => startTransition(() => excluirFornecedor({ codigo })),
          isPending,
        }}
        open={confirma}
        setOpen={setConfirma}
      />
    </>
  );
}
