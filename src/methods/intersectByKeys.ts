export default function intersectByKeys(values) {
  let intersectKeys = Object.keys(values)

  if (values instanceof this.constructor)
    intersectKeys = Object.keys(values.all())

  const collection = {}

  Object.keys(this.items).forEach((key) => {
    if (intersectKeys.includes(key))
      collection[key] = this.items[key]
  })

  return new this.constructor(collection)
}
