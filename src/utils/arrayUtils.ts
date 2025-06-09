export const arrayUtils = Object.freeze({
  /**
   * The de-facto unbiased shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle
   * @param {*} array
   * @returns
   */
  shuffle: <T>(array: T[]) => {
    let currentIndex = array.length
    let randomIndex

    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--

      // And swap it with the current element.
      ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }
  },
})
