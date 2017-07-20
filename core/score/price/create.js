'use strict'

const { size, get, toLower } = require('lodash')

const normalizeValue = require('../../util/normalize-value')
const aggregateProp = require('../../util/aggregate-prop')
const createLogMissing = require('./create-log-missing')
const boardSizeRange = require('../../range/board-size')
const sailSizeRange = require('../../range/sail-size')
const serializeProp = require('./serialize-prop')

const createTest = test => item =>
  test(item) && size(item.category) === 1 && item.price && item.year

const createGetKey = (getKey, logMissing) => item => {
  const customKey = getKey(item, serializeProp, logMissing)
  let key = `${item.category}.${item.condition}${customKey}`
  key += serializeProp(key, item['mast carbon'], `C${item['mast carbon']}`)
  key += serializeProp(key, item['sail size'], `${sailSizeRange(item['sail size'])}`)
  key += serializeProp(key, item['board size'], `${boardSizeRange(item['board size'])}`)
  key += serializeProp(key, item.year)

  // TODO: Add mast size range
  // TODO: Add mast type
  // TODO: Add fin size
  // TODO: Add fin type
  // TODO: Add boom size range
  // TODO: Add boom size

  return toLower(key)
}

const calculateScore = (value, aggregation) => {
  const {min, max, total} = aggregation

  return total === 1 && min === max
    ? 1
    : normalizeValue(value, [
    { value: aggregation.min, norm: 1 },
    { value: aggregation.max, norm: 0 }
    ])
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
    const aggregation = aggregate[key]
    const score = calculateScore(value, aggregation)

    log.debug('score:price', {aggregation, score})
    return score
  }

  getScore.aggregate = aggregate

  return getScore
}

module.exports = createGetScore
