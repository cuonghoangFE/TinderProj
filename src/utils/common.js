const capitalizeLetter = string =>
  string.replace(/(?:^|\s)\S/g, a => a.toUpperCase());

export default {
  capitalizeLetter,
};
