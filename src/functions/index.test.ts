import { arrayContains } from './index'
describe('functions', () => {
  it('returns true if a string exist in an array of string', () => {
    expect(arrayContains('a', ['b', 'a', 'c'])).toBe(true)
  })

  it('returns false if a string does not exist an array of string', () => {
    expect(arrayContains('a', ['z', 'b', 'd', 'c'])).toBe(false)
  })
})
