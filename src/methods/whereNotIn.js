import extractValues from '../helpers/values'
import nestedValue from '../helpers/nestedValue'

export default function whereNotIn(key, values) {
  const items = extractValues(values)

  const collection = this.items
    .filter(item => !items.includes(nestedValue(item, key)))

  return new this.constructor(collection)
}
