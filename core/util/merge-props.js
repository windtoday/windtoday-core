'use strict'

const { concat, isNil } = require('lodash')

function mergeProps (val1, val2) {
  if (isNil(val1) || isNil(val2)) return
  if (val1 === val2) return
  return concat(val1, val2)
}

module.exports = mergeProps
