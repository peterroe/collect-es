import variadic from '../helpers/variadic'

export default function except(...args) {
  const properties = variadic(args)

  if (Array.isArray(this.items)) {
    const collection = this.items
      .filter(item => !properties.includes(item))

    return new this.constructor(collection)
  }

  const collection = {}

  Object.keys(this.items).forEach((property) => {
    if (!properties.includes(property))
      collection[property] = this.items[property]
  })

  return new this.constructor(collection)
}
