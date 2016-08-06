'use strict'

/**
 * Blacklist of keywords to prevent add not interesting topics.
 */

var WORDS = require('./words.json')
var regex = new RegExp(WORDS.join('|'), 'i')

function isBlacklisted (str) {
  return str.length && regex.test(str)
}

isBlacklisted.regex = regex

module.exports = isBlacklisted
