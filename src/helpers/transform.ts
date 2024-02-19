import currency from "currency.js";

const BRL = {
  symbol: "R$",
  decimal: ",",
  separator: ".",
  pattern: "! #",
  negativePattern: "- ! #",
};

export const toCurrency = (amount: number): currency => {
  return currency(amount, BRL);
};
