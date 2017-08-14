'use strict'

const { reduce, isNil } = require('lodash')

const range = {
  'sail size': require('./sail-size'),
  'board size': require('./board-size'),
  'mast carbon': require('./mast-carbon'),
  'boom size': require('./boom-size'),
  'mast size': require('./mast-size')
}

module.exports = doc =>
  reduce(
    range,
    function (acc, fn, key) {
      const docValue = doc[key]
      if (!isNil(docValue)) acc[`${key} range`] = fn(docValue)
      return acc
    },
    {}
  )
