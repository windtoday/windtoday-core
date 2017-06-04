'use strict'

const normalizeValue = require('./normalize-value')
const {round, get} = require('lodash')

function createGetScore (opts) {
  const {aggregate, getKey, test, propName} = opts

  function getScore (doc) {
    if (!test(doc)) return 0

    const value = get(doc, propName)
    const key = getKey(doc)
    const score = aggregate[key]

    const normalize = normalizeValue(value, [
      { value: score.min, norm: 5 },
      { value: score.max, norm: 1 }
    ])

    return round(normalize)
  }

  return getScore
}

module.exports = createGetScore
