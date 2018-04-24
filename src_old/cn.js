let cnRegex = /[\u4e00-\u9fff]+/g;
let paragraphCounter = /[\u00ff-\uffff]|\S+/g;

let cnPercentage = post => {
  if (post.length === 0) {
    return { error: 'error' };
  }

  let paragaphWords = post.match(paragraphCounter).length;

  let extractCnWords;
  try {
    extractCnWords = post
      .match(cnRegex)
      .join('')
      .match(paragraphCounter).length;
  } catch (e) {
    extractCnWords = 0;
  }

  console.log(`${paragaphWords} ${extractCnWords}`);

  return {
    words: paragaphWords,
    cnWords: extractCnWords,
    ratio: extractCnWords / paragaphWords
  };
};

module.exports = { cnPercentage };
