const capitalizeLetter = string =>
  string.replace(/(?:^|\s)\S/g, a => a.toUpperCase());

const debounce = (func, delay) => {
  let debounceTimer;
  return function() {
    // eslint-disable-next-line consistent-this
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

export default {
  capitalizeLetter,
  debounce,
};
