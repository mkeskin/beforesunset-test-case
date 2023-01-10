/**
 * Converts RGB color format to HEX color format
 *
 * @param {number} r - Red component of RGB color, value between 0 and 255
 * @param {number} g - Green component of RGB color, value between 0 and 255
 * @param {number} b - Blue component of RGB color, value between 0 and 255
 * @return {string} The HEX color via format #rrggbb
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
  // Generate the parts of the hexadecimal string
  const frst = r.toString(16).padStart(2, '0')
  const scnd = g.toString(16).padStart(2, '0')
  const thrd = b.toString(16).padStart(2, '0')

  // Return the color as a hexadecimal string
  return `#${frst}${scnd}${thrd}`
}

/**
 * Generates a random color in the form of a hexadecimal string.
 *
 * @return {string} The generated color in HEX format
 */
export const random = (): string => {
  // Use Math.random() to generate three random values between 0 and 255
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)

  // Converts the color from RGB to HEX and returns the result
  return rgbToHex(r, b, b)
}

/**
 * Generates a random color in hexadecimal string format based on the given
 * input.
 *
 * @param {string} input - The input string that will be used as the seed for
 * the random color generator
 * @return {string} A hexadecimal string representation of the generated color
 */
export const generate = (input: string): string => {
  let hash = 0
  for (var i = 0; i < input.length; i++) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash)
  }

  // It uses bit shifting and bitwise AND operator to extract these 3 components
  // from the hash variable.
  const r: number = (hash >> 0) & 0xff
  const g: number = (hash >> 8) & 0xff
  const b: number = (hash >> 16) & 0xff

  // Converts the color from RGB to HEX and returns the result
  return rgbToHex(r, b, b)
}
