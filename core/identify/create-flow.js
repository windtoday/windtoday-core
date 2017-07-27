'use strict'

const { mergeWith, reduce } = require('lodash')

const serializer = require('../schema/serializer')
const mergeProps = require('../util/merge-props')

const createFlow = identifiers => str => reduce(
  identifiers,
  function (acc, identify) {
    const { data, output } = identify(acc.output)
    acc.output = output
    acc.data = mergeWith(acc.data, serializer(data), mergeProps)
    return acc
  },
  { output: str }
)

module.exports = createFlow
