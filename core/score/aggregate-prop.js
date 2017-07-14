'use strict'

const {get, reduce, round, divide} = require('lodash')
const percentile = require('stats-percentile')
const p95 = data => percentile(data, 95)

function getAggregate (opts) {
  const {data, test, getKey, propName} = opts

  return reduce(data, function (acc, doc) {
    if (test(doc)) {
      const key = getKey(doc)
      const prop = get(doc, propName)

      if (!acc[key]) {
        acc[key] = {
          avg: prop,
          values: [prop],
          total: 1,
          min: prop,
          max: prop
        }
      } else {
        if (prop > acc[key].max) acc[key].max = prop
        if (prop < acc[key].min) acc[key].min = prop
        acc[key].avg = acc[key].avg + prop
        acc[key].values.push(prop)
        acc[key].total = acc[key].total + 1
      }
    }

    return acc
  }, {})
}

function getResume (aggregate) {
  return reduce(aggregate, function (acc, value, key) {
    const {max, min, avg, total, values} = value

    acc[key] = {
      total,
      min,
      max,
      avg: round(divide(avg, total)),
      p95: p95(values, total)
    }

    return acc
  }, {})
}

const aggregateProp = opts => getResume(getAggregate(opts))

module.exports = aggregateProp
