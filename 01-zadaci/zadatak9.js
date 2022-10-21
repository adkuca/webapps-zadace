const haveMatchingKeys = (a, b) => {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;
  if (!aKeys.some((aKey) => bKeys.includes(aKey))) return false;

  return true;
};
