'use strict'

const { size, round, get, toLower } = require('lodash')

const normalizeValue = require('../../util/normalize-value')
const aggregateProp = require('../../util/aggregate-prop')
const createLogMissing = require('./create-log-missing')
const serializeProp = require('./serialize-prop')

const createTest = test => item =>
  test(item) && size(item.category) === 1 && item.price

const createGetKey = (getKey, logMissing) => item => {
  const customKey = getKey(item, serializeProp, logMissing)
  const key = `${item.category}${customKey}`
  return toLower(key)
}

const createGetScore = ({
  log,
  data,
  getKey: _getKey,
  test: _test,
  propName
}) => {
  const logMissing = createLogMissing(log)
  const getKey = createGetKey(_getKey, logMissing)
  const test = createTest(_test)

  const aggregate = aggregateProp({ data, test, getKey, propName })

  const getScore = doc => {
    if (!test(doc)) return 0

    const value = get(doc, propName)
    const key = getKey(doc)
    const score = aggregate[key]

    const scoreNormalized = normalizeValue(value, [
      { value: score.min, norm: 100 },
      { value: score.max, norm: 0 }
    ])

    return round(scoreNormalized)
  }

  getScore.aggregate = aggregate

  return getScore
}

module.exports = createGetScore
