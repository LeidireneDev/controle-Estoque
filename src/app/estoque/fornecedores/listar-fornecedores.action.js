"use server";

import { listar } from "@/back-end/fornecedores";

export async function listarFornecedores() {
  return await listar();
}
