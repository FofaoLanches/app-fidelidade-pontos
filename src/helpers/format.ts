export const formatPhone = (text: string) => {
  const cleaned = `${text}`.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  return cleaned;
};

const _formatForOnlyNumbers = (text: string) => {
  return text.replace(/[^0-9]/g, "");
};

export const formatCurrencyInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  let { value = "" } = event.target;

  value = _formatForOnlyNumbers(value);

  if (!value) {
    return "";
  }

  let valueAux: string | number = value;

  valueAux = `${valueAux}`;
  valueAux = parseInt(valueAux.replace(/[\D]+/g, ""), 10);
  valueAux = `${valueAux}`;
  valueAux = valueAux.replace(/([0-9]{2})$/g, ",$1");

  if (valueAux.length > 6) {
    valueAux = valueAux.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
  }

  return valueAux;
};

export const formatTime =(input: string) => {
    const cleanedInput = input.replace(/[^\d]/g, '');

    let formattedHour = '';

    for (let i = 0; i < cleanedInput.length; i++) {
        if (i === 2) {
            formattedHour += ':';
        }
        formattedHour += cleanedInput[i];
    }

    return formattedHour.substr(0, 5);
}
