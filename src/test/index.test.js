const assert = require('assert');
const steem = require('steem');

const { arrayContains } = require('../functions');
const { cnPercentage } = require('../cn');

assert.equal(arrayContains('test', ['bob', 'test']), true);
assert.equal(arrayContains('malaysia', ['test']), false);
console.log('[TEST] Done array test.');

let test1 = 'I am from 美国。We should be friends. 朋友。';
console.log(cnPercentage(test1));

console.log('all test pass');

steem.api.getContent(
  'superoo7-dev',
  'cn-malaysia-bot-testing-againg',
  function(err, result) {
    console.log(cnPercentage(result.body).ratio < 0.2);
  }
);

