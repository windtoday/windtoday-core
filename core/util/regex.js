'use strict'

var memoize = require('lodash/memoize')

module.exports = memoize(function createRegex (pattern) {
  return new RegExp(pattern, 'i')
})
