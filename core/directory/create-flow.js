'use strict'

const { mergeWith, reduce } = require('lodash')
const mergeProps = require('../util/merge-props')

function createFlow (directories) {
  function flow (str, opts) {
    return reduce(
      directories,
      function (acc, directory) {
        const { data, output } = directory(acc.output, opts)
        acc.output = output
        acc.data = mergeWith(acc.data, data, mergeProps)
        return acc
      },
      { output: str }
    )
  }

  return flow
}

module.exports = createFlow
