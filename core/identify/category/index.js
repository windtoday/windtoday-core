'use strict'

const REGEX_SAILS_KEYWORDS = RegExp(require('./sails.json').join('|'), 'i')
const REGEX_BOARDS_KEYWORDS = RegExp(require('./boards.json').join('|'), 'i')
const REGEX_FINS_KEYWORDS = RegExp(require('./fins.json').join('|'), 'i')
const REGEX_BOOMS_KEYWORDS = RegExp(require('./booms.json').join('|'), 'i')
const REGEX_MASTS_KEYWORDS = RegExp(require('./masts.json').join('|'), 'i')
const { bind } = require('lodash')

function createBooleanRegex (regex) {
  return bind(regex.test, regex)
}

module.exports = {
  sails: createBooleanRegex(REGEX_SAILS_KEYWORDS),
  boards: createBooleanRegex(REGEX_BOARDS_KEYWORDS),
  fins: createBooleanRegex(REGEX_FINS_KEYWORDS),
  booms: createBooleanRegex(REGEX_BOOMS_KEYWORDS),
  masts: createBooleanRegex(REGEX_MASTS_KEYWORDS)
}
