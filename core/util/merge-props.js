'use strict'

const exists = require('existential')
const { concat } = require('lodash')

function mergeProps (val1, val2) {
  if (!exists(val1) || !exists(val2)) return
  if (val1 === val2) return
  return concat(val1, val2)
}

module.exports = mergeProps
