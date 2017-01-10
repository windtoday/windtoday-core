'use strict'

const { merge, reduce } = require('lodash')
const serializer = require('../schema/serializer')

function createFlow (identifiers) {
  function flow (str) {
    return reduce(identifiers, function (acc, identify) {
      const {data, output} = identify(acc.output)
      acc.output = output
      acc.data = merge(acc.data, serializer(data))
      return acc
    }, {output: str})
  }

  return flow
}

module.exports = createFlow
