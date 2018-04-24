import { cnPercentage } from './index'

describe('regex', () => {
  it('calculates the ratio correctly', () => {
    // 1 word ->  。, friends.
    let testString: string = 'I am from 美国。We should be friends. 朋友。'
    let testRatio = 4 / 13
    expect(cnPercentage(testString).ratio).toBe(testRatio)
  })
})
