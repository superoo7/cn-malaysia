const steem = require('steem');

const { arrayContains } = require('./functions');
const { cnPercentage } = require('./cn');
const { comment } = require('./steem');

console.log();

// CONST
const tagToLookFor = 'cn-malaysia';

steem.api.streamTransactions('head', function(err, result) {
  if (err) {
    return;
  }
  let txType = result.operations[0][0];
  let txData = result.operations[0][1];
  if (txType == 'comment' && txData.parent_author === '') {
    let tags;

    try {
      tags = JSON.parse(txData.json_metadata).tags;
    } catch (e) {
      return;
    }
    if (arrayContains(tagToLookFor, tags)) {
      console.log(`${txData.author}/${txData.permlink}`);
      let data = {
        author: txData.author,
        permlink: txData.permlink
      };

      steem.api.getContent(
        data.author,
        data.permlink,
        function(err, result) {
          let percentage = cnPercentage(result.body).ratio;
          if (percentage < 0.2) {
            console.log(
              `[Violated] (${percentage}%): ${
                txData.author
              }/${txData.permlink}`
            );
            comment(data);
          }
        }
      );
    }
  }
});
