import variadic from '../helpers/variadic'

export default function only(...args) {
  const properties = variadic(args)

  if (Array.isArray(this.items)) {
    const collection = this.items
      .filter(item => properties.includes(item))

    return new this.constructor(collection)
  }

  const collection = {}

  Object.keys(this.items).forEach((prop) => {
    if (properties.includes(prop))
      collection[prop] = this.items[prop]
  })

  return new this.constructor(collection)
}
