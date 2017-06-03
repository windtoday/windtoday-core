'use strict'

const normalizeValue = require('./normalize-value')
const {round, get} = require('lodash')

function createGetScore (opts) {
  const {aggregate, getKey, test, propName} = opts

  function getScore (doc) {
    if (!test(doc)) return 0

    const prop = get(doc, propName)
    const key = getKey(doc)
    const score = aggregate[key]

    const normalize = normalizeValue(prop, [
      { value: score.min, norm: 1 },
      { value: score.max, norm: 0 }
    ])

    return round(normalize, 2)
  }

  return getScore
}

module.exports = createGetScore
