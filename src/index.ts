// lib
import * as dotenv from 'dotenv'
import { Client, DatabaseAPI, BlockchainMode, PrivateKey } from 'dsteem'
import * as es from 'event-stream'
import * as util from 'util'

// file
import { arrayContains, die, save } from './functions'
import { TAG, WHITELIST, PERCENTAGE } from './config'
import { getContent, comment } from './steem'
import { cnPercentage } from './regex'

// Init

// Environment Init
dotenv.config()
if (!process.env.ACCOUNT_NAME || !process.env.ACCOUNT_KEY) throw new Error('ENV variable missing')
// @ts-ignore
let ACCOUNT_NAME: string = process.env.ACCOUNT_NAME
// @ts-ignore
let ACCOUNT_KEY: string = process.env.ACCOUNT_KEY
if (ACCOUNT_NAME === '' || ACCOUNT_NAME === '') die('Check .env file')

// Steem Init

const client = new Client('https://api.steemit.com')
const db = new DatabaseAPI(client)
let key = PrivateKey.fromLogin(ACCOUNT_NAME, ACCOUNT_KEY, 'posting')
const stream = client.blockchain.getOperationsStream({ mode: BlockchainMode.Latest })

console.log('Operation started')

// Stream Steem Blockchain
stream.on('data', async operation => {
  // Look for comment type of transaction
  if (operation.op[0] == 'comment') {
    let txData = operation.op[1]
    // Check if it is post
    if (txData.parent_author === '') {
      let tags: string[]
      try {
        tags = JSON.parse(txData.json_metadata).tags
      } catch (e) {
        console.error('Invalid tags')
        return
      }
      // if it contain that certain TAG
      if (arrayContains(TAG, tags)) {
        let author: string = txData.author
        let permlink: string = txData.permlink
        // Return whitelisted author
        if (arrayContains(author, WHITELIST)) return
        let body = await getContent(author, permlink).catch(() =>
          console.error("Couldn't fetch post data with SteemJS")
        )
        //
        let cn = cnPercentage(body)
        // if error
        if (cn.error !== '') return
        // extract the percentage
        let percentage = cn.ratio
        // if less than treshold percentage
        if (percentage < PERCENTAGE / 100) {
          // Check wether commented before
          await save(`@${author}/${permlink}`)
            .then(isSaved => {
              if (!!isSaved) {
                // Send Comment
                comment(client, author, permlink, key, ACCOUNT_NAME).catch(() =>
                  console.error("Couldn't comment on the violated post")
                )
                return
              } else {
                return
              }
            })
            .catch(() => {
              console.error("Couldn't save json")
            })
        } else {
          return
        }
      }
    }
  }
  return
})
