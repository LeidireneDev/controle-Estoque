"use client";

import { NumericFormat } from "react-number-format";
import { useState } from "react";

const MoneyInput = ({ label, name, valorInicial = "", hasError, ...props }) => {
  const valorInicialNumerico =
    valorInicial === "" ? null : parseFloat(valorInicial.replace(",", "."));
  const [value, setValue] = useState(valorInicialNumerico);

  return (
    <CurrencyInput
      id={name}
      label={label}
      name={name}
      value={value}
      onChange={(newValue) => setValue(newValue)}
      {...props}
    />
  );
};

const CurrencyInput = ({
  label,
  name,
  value,
  onChange,
  hasError,
  ...props
}) => {
  const handleValueChange = (values) => {
    const { floatValue } = values;
    onChange(floatValue);
  };

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>

      <div className="relative mt-2">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <span className="text-gray-500 sm:text-sm">R$</span>
        </div>
        <NumericFormat
          id={name}
          name={name}
          value={value}
          thousandSeparator="."
          decimalSeparator=","
          decimalScale={2}
          fixedDecimalScale
          prefix=""
          allowNegative={false}
          onValueChange={handleValueChange}
          {...props}
          className={`block w-full rounded-md border-0 py-1.5 pl-9 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
            hasError ? " border-red-600" : ""
          }`}
        />
      </div>
    </div>
  );
};

export { MoneyInput };
