"use client";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navigation = [
  { name: "Home", href: "#", current: false },
  { name: "Estoque", href: "/estoque/produtos", current: true },
  { name: "Perfil", href: "#", current: false },
];

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative flex justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <MobileMenuButton open={open} />
              </div>
              <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                <Logo />
                <MenuItems />
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <ProfileDropdown />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <MobileMenuItems />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

const Logo = () => (
  <div className="flex items-center flex-shrink-0">
    <img
      class="h-8 w-auto"
      src="https://cdn-icons-png.flaticon.com/512/4947/4947506.png"
      alt="Ícone controle de estoque"
    />
  </div>
);

const MobileMenuButton = ({ open }) => (
  <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
    {open ? (
      <XMarkIcon className="block w-6 h-6" />
    ) : (
      <Bars3Icon className="block w-6 h-6" />
    )}
  </Disclosure.Button>
);

const MenuItems = () => (
  <div className="relative z-0 flex items-center justify-center flex-1 hidden px-2 sm:absolute sm:inset-0 sm:ml-6 sm:flex sm:space-x-8">
    {navigation.map((item) => (
      <a
        key={item.name}
        href={item.href}
        className={classNames(
          item.current
            ? "border-indigo-500 text-gray-900"
            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
          "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
        )}
      >
        {item.name}
      </a>
    ))}
  </div>
);

const MobileMenuItems = () => (
  <div className="pt-2 pb-4 space-y-1">
    {navigation.map((item) => (
      <Disclosure.Button
        key={item.name}
        as="a"
        href={item.href}
        className={classNames(
          item.current
            ? "border-indigo-500 bg-indigo-50 text-indigo-700"
            : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800",
          "block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
        )}
        aria-current={item.current ? "page" : undefined}
      >
        {item.name}
      </Disclosure.Button>
    ))}
  </div>
);

const ProfileDropdown = () => (
  <Menu as="div" className="relative ml-3">
    <div>
      <Menu.Button className="flex text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        <svg
          className="w-10 h-10 p-2 subpixel-antialiased rounded-full stroke-slate-800 hover:bg-gray-200"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      </Menu.Button>
    </div>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-200"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <Menu.Item>
          {({ active }) => (
            <a
              href="#"
              className={classNames(
                active ? "bg-gray-100" : "",
                "block px-4 py-2 text-sm text-gray-700"
              )}
            >
              Seu Perfil
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              href="#"
              className={classNames(
                active ? "bg-gray-100" : "",
                "block px-4 py-2 text-sm text-gray-700"
              )}
            >
              Sair
            </a>
          )}
        </Menu.Item>
      </Menu.Items>
    </Transition>
  </Menu>
);
