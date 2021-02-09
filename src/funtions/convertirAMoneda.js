const formatearValor = (valor) => {
  return new Intl.NumberFormat("en-Us", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(valor);
};

export default formatearValor;
