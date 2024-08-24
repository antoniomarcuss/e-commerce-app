export function currencyMask(value) {
  value = value.toString().replace(/\D/g, "");

  value = value.replace(/(\d)(\d{2})$/, "$1.$2");

  value = value.replace(/(\d)(\d{3})(\d{3})(\d{2})/, "$1.$2.$3.$4");

  return value;
}
