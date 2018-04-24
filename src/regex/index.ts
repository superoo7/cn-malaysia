let cnRegex: RegExp = /[\u4e00-\u9fff]+/g
let paragraphCounter: RegExp = /[\u00ff-\uffff]|\S+/g

// This functions check the percentage of chinese words in a post
export const cnPercentage = (
  post: string
): { words: number; cnWords: number; ratio: number; error: string } => {
  let extractCnWords: number, paragaphWords: number

  if (post.length === 0) {
    return { words: 0, cnWords: 0, ratio: 0, error: 'error' }
  }

  let paragraph: RegExpMatchArray | null = post.match(paragraphCounter)
  paragaphWords = !paragraph ? 0 : paragraph.length

  let cnWords = post.match(cnRegex)
  if (!!cnWords) {
    let wString: string = cnWords.join('')
    let wCounter: RegExpMatchArray | null = wString.match(paragraphCounter)
    extractCnWords = !wCounter ? 0 : wCounter.length
  } else {
    extractCnWords = 0
  }

  console.log(`${paragaphWords} ${extractCnWords}`)

  return {
    words: paragaphWords,
    cnWords: extractCnWords,
    ratio: extractCnWords / paragaphWords,
    error: ''
  }
}
