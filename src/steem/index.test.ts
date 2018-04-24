import { getContent } from './index'
import { Client, DatabaseAPI, BlockchainMode, PrivateKey } from 'dsteem'
import { comment } from './index'
import * as dotenv from 'dotenv'

dotenv.config()

if (!process.env.ACCOUNT_NAME || !process.env.ACCOUNT_KEY) throw new Error('ENV variable missing')
let ACCOUNT_NAME: string = process.env.ACCOUNT_NAME
let ACCOUNT_KEY: string = process.env.ACCOUNT_KEY

const client = new Client('https://api.steemit.com')
const db = new DatabaseAPI(client)
let key = PrivateKey.from(ACCOUNT_KEY)

describe('steem', () => {
  let author: string, permlink: string
  beforeAll(() => {
    // example post: https://steemit.com/javascript/@superoo7/dsteem-vs-steemjs
    author = 'superoo7'
    permlink = 'dsteem-vs-steemjs'
  })

  it('fetches blog post body from steem', async () => {
    const body: string = await getContent(author, permlink)
    expect(typeof body).toBe('string')
  })

  // This will comment on the test post, to test wether the comment executed

  // it('comments on the post', async () => {
  //   await comment(client, author, permlink, key, ACCOUNT_NAME)
  // })
})
