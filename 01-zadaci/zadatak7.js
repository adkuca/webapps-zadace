const productOfMultiplesOf7 = (x) => {
  if (!(x >= 0 && x <= 1000)) return -1;

  let multiplesProduct;
  for (let multiple = 7; multiple <= x; multiple += 7)
    multiplesProduct = multiplesProduct ? multiplesProduct * multiple : multiple;

  return productOfMultiplesOf7;
};
