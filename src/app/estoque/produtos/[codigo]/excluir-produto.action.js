"use server";

import { excluir } from "@/back-end/produtos";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function excluirProduto({ codigo }) {
  await excluir({ codigo });

  revalidatePath(`/estoque/produtos/${codigo}`);
  revalidatePath(`/estoque/produtos`);

  redirect("/estoque/produtos");
}
