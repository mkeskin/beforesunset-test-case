/**
 * Pluralizes a word in English.
 *
 * @param {string} word - The word to pluralize
 * @return {string} The plural form of the word
 */
export const pluralize = (word: string): string => {
  // If the word ends in "s", "sh", "ch", "x", or "z", add "es" to the end of the word
  if (/[s|sh|ch|x|z]$/.test(word)) {
    return `${word}es`
  }
  // If the word ends in "y" and the letter before the "y" is a consonant, remove the "y" and add "ies"
  if (/[^aeiou]y$/.test(word)) {
    return `${word.slice(0, -1)}ies`
  }
  // In all other cases, add "s" to the end of the word
  return `${word}s`
}

/**
 * Formats a word usign with number as a plural string.
 *
 * @param {string} word - The word to pluralize
 * @param {number} total - The total number of items
 * @return {string} The formatted string
 */
export const plural = (word: string, total: number): string =>
  total < 2 ? `${total} ${word}` : `${total} ${pluralize(word)}`
