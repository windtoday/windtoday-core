'use strict'

/**
 * Blacklist of keywords to prevent add not interesting topics.
 */

const WORDS = require('./words.json')
const regex = RegExp(WORDS.join('|'), 'i')

function isBlacklisted (str) {
  return str.length && regex.test(str)
}

isBlacklisted.regex = regex

module.exports = isBlacklisted
