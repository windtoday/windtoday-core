'use strict'

const {get, reduce, round, divide} = require('lodash')

function getAggregate (opts) {
  const {data, test, getKey, propName} = opts

  return reduce(data, function (acc, doc) {
    if (test(doc)) {
      const key = getKey(doc)
      const prop = get(doc, propName)

      if (!acc[key]) {
        acc[key] = {
          avg: prop,
          total: 1,
          min: prop,
          max: prop
        }
      } else {
        if (prop > acc[key].max) acc[key].max = prop
        if (prop < acc[key].min) acc[key].min = prop

        acc[key].avg = acc[key].avg + prop
        acc[key].total = acc[key].total + 1
      }
    }
    return acc
  }, {})
}

function getResume (aggregate) {
  return reduce(aggregate, function (acc, value, key) {
    const {max, min, avg, total} = value
    acc[key] = {min, max, avg: round(divide(avg, total))}
    return acc
  }, {})
}

const aggregateProp = opts => getResume(getAggregate(opts))

module.exports = aggregateProp
