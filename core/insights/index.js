'use strict'

const {size: getSize, get, iteratee, mapValues, set, chain, reduce} = require('lodash')
const calcPercent = require('calc-percent')

const groupBy = (data, size, groupPropName) => {
  const getPropName = iteratee(groupPropName)
  const group = reduce(data, (acc, item) => {
    const propName = getPropName(item)
    incrementPropName(acc, propName)
    return acc
  }, {})

  return mapPercent(group, size)
}

const incrementPropName = (acc, key) => {
  const count = get(acc, key, 0)
  set(acc, key, count + 1)
}

const mapPercent = (acc, total) => mapValues(acc, count => {
  const percent = getPercent(count, total)
  return {count, percent}
})

const getUniqValues = (data, iteratee) => chain(data)
  .uniqBy(iteratee)
  .map(iteratee)
  .value()

const getPercent = (partial, total) => calcPercent(partial, total, {suffix: '%'})

function insights (data) {
  const count = getSize(data)

  return {
    count,
    providers: getUniqValues(data, 'provider'),
    provider: groupBy(data, count, 'provider'),
    category: groupBy(data, count, 'category'),
    condition: groupBy(data, count, 'condition')
  }
}

module.exports = insights
