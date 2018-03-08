const steem = require('steem');
const dotenv = require('dotenv');

dotenv.config();

const comment = data => {
  const commentContent = `
Hello @${data.author},
Thank you for having interest in #cn-malaysia. For your information, CN stands for Chinese, and of course MALAYSIA, which means that the content or the author is a Malaysian are supposed to use this tag for our locals to track their posts in their preferred language, in this circumstances Chinese is the preferred language. Few of the criteria are simple:
1) Content with at least 40% of Chinese words authored originally by the blogger
2) Translated content directly from translating tool does not count
3) If the content has nothing concern to Malaysian, nor in Chinese language, then you have no reason to use this tag. We will not upvote you.
You see? It’s simple. Chinese . Malaysia. Let us keep things simple. If you need a Chinese language tuition, I can recommend you some online tutorial.
Best regards,
#cn-malaysia, #teammalaysia
  `;

  return steem.broadcast.comment(
    process.env.ACCOUNT_KEY,
    data.author,
    data.permlink,
    process.env.ACCOUNT_NAME,
    randomString(),
    '',
    commentContent,
    { tags: ['cn-malaysia'], app: 'cn-malaysia' },
    function(err, result) {
      console.log(err, result);
    }
  );
};

function randomString() {
  let string = '';
  let allowedChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < 32; i++) {
    string += allowedChars.charAt(
      Math.floor(Math.random() * allowedChars.length)
    );
  }
  return string + '-post';
}

module.exports = { comment };
