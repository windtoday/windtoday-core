'use strict'

const REGEX_BOARDS_KEYWORDS = RegExp(require('./boards.json').join('|'), 'i')
const REGEX_BOOMS_KEYWORDS = RegExp(require('./booms.json').join('|'), 'i')
const REGEX_SAILS_KEYWORDS = RegExp(require('./sails.json').join('|'), 'i')
const REGEX_MASTS_KEYWORDS = RegExp(require('./masts.json').join('|'), 'i')
const REGEX_FINS_KEYWORDS = RegExp(require('./fins.json').join('|'), 'i')
const { forEach, bind, size, reduce } = require('lodash')
const categories = require('../../category')

const CONST = {
  FALLBACK_CATEGORY: categories('others')
}

function createBooleanRegex (regex) {
  return bind(regex.test, regex)
}

const identify = {
  sails: createBooleanRegex(REGEX_SAILS_KEYWORDS),
  boards: createBooleanRegex(REGEX_BOARDS_KEYWORDS),
  fins: createBooleanRegex(REGEX_FINS_KEYWORDS),
  masts: createBooleanRegex(REGEX_MASTS_KEYWORDS),
  booms: createBooleanRegex(REGEX_BOOMS_KEYWORDS)
}

function identifyCategory (str) {
  const identified = reduce(identify, function (acc, fn, category) {
    if (fn(str)) acc.push(category)
    return acc
  }, [])

  if (!size(identified)) identified.push(CONST.FALLBACK_CATEGORY)
  return identified
}

forEach(identify, function (value, key) {
  identifyCategory[key] = value
})

module.exports = identifyCategory
