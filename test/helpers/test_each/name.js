import { serializeParam } from './serialize.js'

// Retrieve unique test names for each iteration.
// To customize a specific iterable's names, add `name` properties to it,
// for example with `Array.map()`.
// To customize whole names, generate them using the iterated function
// arguments.
export const addNames = function({ index, indexes, params }) {
  const names = params.map(getName)
  const name = names.join(' ')
  return { name, names, index, indexes, params }
}

const getName = function(param) {
  const name = serializeParam(param)
  const nameA = name.trim()
  const nameB = truncateName(nameA)
  return nameB
}

// Make names short by truncating them
const truncateName = function(name) {
  if (name.length <= MAX_NAME_LENGTH) {
    return name
  }

  const nameA = name.slice(0, MAX_NAME_LENGTH)
  return `${nameA}...`
}

const MAX_NAME_LENGTH = 60