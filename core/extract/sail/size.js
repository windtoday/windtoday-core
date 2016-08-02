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
var REGEX_SAIL_SIZE = /\d[ ,.']\d|\d[ ]?m/
var REGEX_SAIL_SEPARATOR = /[ ,']/

function extractSailSize (str) {
  var result = lodash.first(str.match(REGEX_SAIL_SIZE))
  return result && lodash.replace(result, REGEX_SAIL_SEPARATOR, '.')
}

module.exports = extractSailSize
