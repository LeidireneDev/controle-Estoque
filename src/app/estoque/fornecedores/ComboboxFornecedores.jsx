"use client";

import { useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { listarFornecedores } from "./listar-fornecedores.action";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function FornecedorCombobox() {
  let [startTransition] = useTransition();
  const [query, setQuery] = useState("");
  const [selectedFornecedor, setSelectedFornecedor] = useState(null);
  const fornecedores = startTransition(() => listarFornecedores());

  const filteredFornecedores =
    query === ""
      ? fornecedores
      : fornecedores.filter((fornecedor) => {
          return fornecedor.name.toLowerCase().includes(query.toLowerCase());
        });

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && query !== "") {
      event.preventDefault();
      const newFornecedor = { id: Math.random(), name: query };
      setSelectedFornecedor(newFornecedor);
      setQuery("");
      alert(`Novo fornecedor "${newFornecedor.name}" criado!`);
    }
  };

  return (
    <Combobox
      as="div"
      value={selectedFornecedor}
      onChange={setSelectedFornecedor}
    >
      <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">
        Assigned to
      </Combobox.Label>
      <div className="relative mt-2">
        <Combobox.Input
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
          displayValue={(fornecedor) => fornecedor?.name}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center px-2 rounded-r-md focus:outline-none">
          <ChevronUpDownIcon
            className="w-5 h-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {filteredFornecedores.length > 0 && (
          <Combobox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredFornecedores.map((fornecedor) => (
              <Combobox.Option
                key={fornecedor.id}
                value={fornecedor}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-8 pr-4",
                    active ? "bg-indigo-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        "block truncate",
                        selected && "font-semibold"
                      )}
                    >
                      {fornecedor.name}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 left-0 flex items-center pl-submitted1.5",
                          active ? "text-white" : "text-indigo-600"
                        )}
                      >
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
