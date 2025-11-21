export function formatPostType(s: string) {
  const words = s.split("_");
  const formattedWords = words.map((word, i) => {
    if (i === 0) {
      return word
    } else if (i === words.length - 1) {
      return pluralizeWord(capitalizeFirstLetter(word))
    } else { return capitalizeFirstLetter(word) }
  })
  return formattedWords.join("");

}

function pluralizeWord(word: string) {
  let letters = word.split("");
  switch (letters.at(-1)) {
    case 'o':
      letters.push('e', 's');
      break;
    case 'y':
      letters = letters.slice(0, -1)
      letters.push('i', 'e', 's');
      break;
    default:
      letters.push('s')
  }

  return letters.join("")
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

