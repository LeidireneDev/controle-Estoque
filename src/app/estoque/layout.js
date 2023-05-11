"use client";

import { useState, Fragment } from "react";
import {
  ChartPieIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
  FolderIcon,
  HomeIcon,
  InboxStackIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { usePathname } from "next/navigation";

const navigation = [
  {
    id: 1,
    name: "Produtos",
    href: "/estoque/produtos",
    icon: InboxStackIcon,
    current: true,
  },
  {
    id: 2,
    name: "Fornecedores",
    href: "/estoque/fornecedores",
    icon: TruckIcon,
    current: false,
  },
  {
    id: 3,
    name: "Relatórios",
    href: "/estoque/relatorios",
    icon: ClipboardDocumentListIcon,
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Estoque({ children }) {
  const pathname = usePathname();
  const currentNavIndex = navigation.findIndex((nav) =>
    pathname.includes(nav.href)
  );

  const [selected, setSelected] = useState(navigation[currentNavIndex]);

  return (
    <>
      <div className="flex flex-col min-h-[calc(100vh-64px)]">
        {/* 3 column wrapper */}
        <div className="w-full mx-auto max-w-7xl grow lg:flex xl:px-2">
          {/* Left sidebar & main wrapper */}
          <div className="flex-1 xl:flex">
            <div className="px-4 py-6 border-b border-gray-200 sm:px-6 lg:pl-8 xl:w-64 xl:shrink-0 xl:border-b-0 xl:border-r xl:pl-6">
              {/* Menu mobile */}
              <div className="lg:hidden">
                <Listbox value={selected} onChange={setSelected}>
                  {({ open }) => (
                    <>
                      <div className="relative mt-2">
                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 sm:text-sm sm:leading-6">
                          <span className="block truncate">
                            {selected.name}
                          </span>
                          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <ChevronUpDownIcon
                              className="w-5 h-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {navigation.map((item) => (
                              <Listbox.Option
                                key={item.id}
                                className={({ active }) =>
                                  classNames(
                                    active
                                      ? "bg-amber-500 text-white"
                                      : "text-gray-900",
                                    "relative cursor-default select-none py-2 pl-3 pr-9"
                                  )
                                }
                                value={item}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={classNames(
                                        selected
                                          ? "font-semibold"
                                          : "font-normal",
                                        "block truncate"
                                      )}
                                    >
                                      {item.name}
                                    </span>
                                    {selected ? (
                                      <span
                                        className={classNames(
                                          active
                                            ? "text-white"
                                            : "text-amber-500",
                                          "absolute inset-y-0 right-0 flex items-center pr-4"
                                        )}
                                      >
                                        <CheckIcon
                                          className="w-5 h-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
              </div>

              {/* Menu desktop */}
              <div className="hidden lg:col-span-3 lg:block xl:col-span-2">
                <nav className="sticky divide-y divide-gray-300 top-4">
                  <div className="pb-8 space-y-1">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.id === selected.id
                            ? "bg-gray-200 text-gray-900"
                            : "text-gray-700 hover:bg-gray-50",
                          "group flex items-center rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.id === selected.id
                              ? "text-gray-500"
                              : "text-gray-400 group-hover:text-gray-500",
                            "-ml-1 mr-3 h-6 w-6 flex-shrink-0"
                          )}
                        />
                        <span className="truncate">{item.name}</span>
                      </a>
                    ))}
                  </div>
                </nav>
              </div>
            </div>

            <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
