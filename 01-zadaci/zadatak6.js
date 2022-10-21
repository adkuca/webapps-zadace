const camelCaseFormat = (string) => {
  if (typeof string !== 'string') return;

  return string
    .trim()
    .split(/\s+/g)
    .reduce(
      (camelCaseOutput, word) =>
        (camelCaseOutput += `${word.at(0).toUpperCase()}${word.substring(1, word.length)}`)
    );
};
