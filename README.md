# CN-MALAYSIA BOT

This is a bot consuming DSteem and SteemJS API.
The bot will comment on the post of users that used #cn-malaysia without fulfilling the prerequisite set.

Current Version: v2.0.0
License: MIT

## Current Rules
- The post must at least contains 20% of chinese words, or else, the bot will comment on the post.

## Feature
- Whitelisted list.
- A data.json is generated to store data of a post in case the bot had already commented.

## Update History

- [v1.0.0](https://steemit.com/utopian-io/@superoo7/cn-malaysia-bot-a-bot-that-automates-moderating-cn-malaysia-community)
- [v2.0.0](https://steemit.com/utopian-io/@superoo7/cn-malaysia-bot-v2-0-0-release-complete-rewrite-added-testing-added-whitelist-remove-duplicate-comment)

## Developer notes

Library used

* 'steem'
* 'dsteem'
* 'typescript'
* 'dotenv'
* 'nodemon'

## How to use it

Create a `.env` to store your posting key and username.

```
ACCOUNT_KEY=POSTING_KEY_HERE
ACCOUNT_NAME=STEEM_NAME
```

Change variables in `config.ts`

Starting the server for development `npm run dev`
> I did not use babel or any minify work flow

For production, I would suggest using PM2 Library. (Install with `npm install -g pm2`)

Then, run `pm2 start src/index.js`



