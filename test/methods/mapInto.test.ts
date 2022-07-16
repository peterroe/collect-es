import { describe, expect, it } from 'vitest'
import collect from '../../src/index.ts'

describe('test', () => {
  it('should map into a class', () => {
    const Person = function p(name) {
      this.name = name
    }

    const collection = collect(['Firmino', 'Mané'])

    const data = collection.mapInto(Person)

    expect(data.all()).to.be.an('array')
    expect(data.first()).to.eql(new Person('Firmino'))
    expect(data.last()).to.eql(new Person('Mané'))
  })
})
