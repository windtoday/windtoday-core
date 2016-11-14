'use strict'

const { flow, merge, reduce, omit } = require('lodash')
const serializer = require('../schema/serializer')
const createLogger = require('../log')

function createCategoryLogger (loggerKeyword, category) {
  return createLogger(`${loggerKeyword}_autodetection_${category}_unidentify`)
}

const normalize = flow([
  serializer,
  (data) => omit(data, 'category')
])

function createFlow (loggerKeyword, identifiers) {
  function flow (str) {
    return reduce(identifiers, function (acc, identify) {
      const { name, fn } = identify
      const log = createCategoryLogger(loggerKeyword, name)
      const extractor = fn(log)

      let {data, output} = extractor(acc.output)
      data = normalize(data)

      acc.output = output
      acc.data = merge(acc.data, data)

      return acc
    }, {output: str})
  }

  return flow
}

module.exports = createFlow
