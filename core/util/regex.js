'use strict'

const { memoize } = require('lodash')

module.exports = memoize(function createRegex (pattern) {
  return new RegExp(pattern, 'i')
})
