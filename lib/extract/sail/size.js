'use strict'

var lodash = require('lodash')

/**
 * Sail range
 * @example
 * 7,8
 * 6.2
 * 5'0
 * @type {RegExp}
 */
var sailSizeRegex = /\d[,.']\d/

function extractSailSize (str) {
  var result = lodash.first(str.match(sailSizeRegex))
  return result && lodash.replace(result, /[,']/, '.')
}

module.exports = extractSailSize
