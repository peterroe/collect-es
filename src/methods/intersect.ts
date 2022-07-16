export default function intersect(values) {
  let intersectValues = values

  if (values instanceof this.constructor)
    intersectValues = values.all()

  const collection = this.items
    .filter(item => intersectValues.includes(item))

  return new this.constructor(collection)
}
