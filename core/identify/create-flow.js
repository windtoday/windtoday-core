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

function createExtractor (loggerKeyword, name, fn) {
  let extractor

  if (loggerKeyword) {
    const log = createCategoryLogger(loggerKeyword, name)
    extractor = fn(log)
  } else {
    extractor = fn
  }

  return extractor
}

// TODO: Need to create a uniform identifier interface.
// Currently this implementatin is a quickwin for avoid loggerKeyword for
// price and year.
function createFlow (opts) {
  const { loggerKeyword, identifiers } = opts

  function flow (str) {
    return reduce(identifiers, function (acc, identify) {
      const { name, fn } = identify
      const extractor = createExtractor(loggerKeyword, name, fn)

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
