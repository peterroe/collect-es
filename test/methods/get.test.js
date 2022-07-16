import { describe, expect, it } from 'vitest'
import collect from '../../src/index.ts'

const data = {
  firstname: 'Sadio',
  lastname: 'Mané',
}

describe('test', () => {
  const collection = collect(data)

  it('should return the item at a given key', () => {
    expect(collection.get('firstname')).to.eql('Sadio')
    expect(collection.get('name')).to.eql(null)
    expect(collection.all()).to.eql(data)
  })

  it('should accept a default value', () => {
    expect(collection.get('name', 'Daniel')).to.eql('Daniel')
    expect(collection.all()).to.eql(data)
  })

  it('should accept a callback as a default value', () => {
    expect(collection.get('name', () => 'Daniel')).to.eql('Daniel')
    expect(collection.all()).to.eql(data)
  })

  it('should handle having 0 as a default value', () => {
    expect(collection.get('missingKey')).to.eql(null)
    expect(collection.get('missingKey', 0)).to.eql(0)
    expect(collection.all()).to.eql(data)
  })
})
