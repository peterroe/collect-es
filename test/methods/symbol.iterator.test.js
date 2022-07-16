import { describe, expect, it } from 'vitest'
import collect from '../../src/index.ts'

describe('test', () => {
  it('should be iterable', () => {
    let result = ''

    for (const item of collect([1, 2, 3, 4, 5]))
      result += item

    expect(result).to.eql('12345')

    const result2 = []
    const clubs = collect([{ name: 'Liverpool' }, { name: 'Arsenal' }, { name: 'Chelsea' }])

    for (const club of clubs)
      result2.push(club)

    expect(result2).to.eql(clubs.all())
  })
})
