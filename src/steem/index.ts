import { Client, DatabaseAPI, DisqussionQuery, PrivateKey } from 'dsteem'
import * as dsteem from 'dsteem'
import * as steem from 'steem'

import { COMMENT } from '../config'

// This function will get the content of the post
export const getContent = async (author: string, permlink: string) => {
  let data = await steem.api.getContentAsync(author, permlink)
  return data.body
}

// This function will comment on the post
export const comment = async (
  client: Client,
  author: string,
  permlink: string,
  key: PrivateKey,
  postingAuthor: string
) => {
  const jsonMetadata = 'cn-malaysia'

  const comment_permlink = new Date()
    .toISOString()
    .replace(/[^a-zA-Z0-9]+/g, '')
    .toLowerCase()

  await client.broadcast
    .comment(
      {
        author: postingAuthor,
        title: '',
        body: COMMENT(author),
        json_metadata: jsonMetadata,
        parent_author: author,
        parent_permlink: permlink,
        permlink: comment_permlink
      },
      key
    )
    .then(
      function(result) {
        console.log('Included in block: ' + result.block_num)
        console.log(`Commented on @${author}/${permlink}`)
      },
      function(error) {
        console.error(error)
      }
    )
  return
}
