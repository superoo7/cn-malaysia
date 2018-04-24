# CN-MALAYSIA BOT

This is a bot consuming SteemJS API. The bot will send out suggestion to those user that use #cn-malaysia without fulfilling the prerequisite (a certain amount of chinese words).

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



