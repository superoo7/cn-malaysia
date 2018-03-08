const steem = require('steem');
const dotenv = require('dotenv');

dotenv.config();

const comment = data => {
  const commentContent = `
Hello @${data.author},

Thank you for having interest in using #cn-malaysia tag.

For your information, CN tag stands for Chinese, and MALAYSIA tag represents Malaysia and Malaysian authors.
Malaysians writing in Chinese are encouraged to use this tag for us to easily identify Malaysians and also a channel where we can announce all upcoming events in Malaysia.

Below are the criteria:

1) Content with at least 40% of Chinese words authored originally by the blogger
2) Translated content directly from translating tool does not count
3) If the content has nothing concern to Malaysian, nor in Chinese language, do refrain from using the tag #cn-malaysia . Further usage would be deemed as tag abuse and further action would be taken.

Therefore, we recommended that do not use #cn-malaysia if the requirement is not met. Hence, there will not be any vote from our team.

Thank you for your understanding.

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
