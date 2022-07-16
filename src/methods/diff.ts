export default function diff(values) {
  let valuesToDiff

  if (values instanceof this.constructor)
    valuesToDiff = values.all()
  else
    valuesToDiff = values

  const collection = this.items.filter(item => !valuesToDiff.includes(item))

  return new this.constructor(collection)
}
