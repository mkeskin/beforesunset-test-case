type GroupedByKey<T> = {
  [key in keyof T]: T[]
}

/**
 * Groups an array of objects by a key.
 *
 * @template T
 * @param {T[]} array - The array to group
 * @param {keyof T} key - The key to group by
 * @return {GroupedByKey<T>} An object with keys for each unique value of the key,
 * and an array of objects as the value for each key
 */
export const groupBy = <T extends { [key: string]: any }>(
  array: T[],
  key: keyof T
): GroupedByKey<T> =>
  array.reduce((result, currentValue) => {
    const group = currentValue[key]

    if (!result[group]) {
      result[group] = []
    }

    result[group].push(currentValue)

    return result
  }, {} as GroupedByKey<T>)
