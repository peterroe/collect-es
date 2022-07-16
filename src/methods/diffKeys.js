export default function diffKeys(object) {
  let objectToDiff

  if (object instanceof this.constructor)
    objectToDiff = object.all()
  else
    objectToDiff = object

  const objectKeys = Object.keys(objectToDiff)

  const remainingKeys = Object.keys(this.items)
    .filter(item => !objectKeys.includes(item))

  return new this.constructor(this.items).only(
    remainingKeys,
  )
}
