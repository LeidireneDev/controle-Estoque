"use server";

import { excluir } from "@/back-end/fornecedores";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function excluirFornecedor({ codigo }) {
  await excluir({ codigo });

  revalidatePath(`/estoque/fornecedores/${codigo}`);
  revalidatePath(`/estoque/fornecedores`);

  redirect("/estoque/fornecedores");
}
