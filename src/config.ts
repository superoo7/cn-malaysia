const TAG = 'cn-malaysia'

const COMMENT = (author: string): string => {
  return `
Hello @${author},

Thank you for having interest in using #cn-malaysia tag.

For your information, CN tag stands for Chinese, and MALAYSIA tag represents Malaysia and Malaysian authors.
Malaysians writing in Chinese are encouraged to use this tag for us to easily identify Malaysians and also a channel where we can announce all upcoming events in Malaysia.

Below are the criteria:

1) Content with at least 40% of Chinese words authored originally by the blogger
2) Translated content directly from translating tool does not count
3) If the content has nothing concern to Malaysian, nor in Chinese language, do refrain from using the tag #cn-malaysia . Further usage would be deemed as tag abuse and further action would be taken.

Therefore, we recommended that do not use #cn-malaysia if the requirement is not met. Hence, there will not be any vote from our team.

Thank you for your understanding. 

P.S. If you think that there is an error about this message, you can refer to superoo7 on steemit.

Best regards,
#cn-malaysia, #teammalaysia
  `
}

const WHITELIST: string[] = ['superoo7']
// percentage allowed for CN words (e.g. 20%)
const PERCENTAGE: number = 20

export { TAG, COMMENT, WHITELIST, PERCENTAGE }
