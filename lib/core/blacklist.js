'use strict'

/**
 * Blacklist of keywords to prevent add not interesting topics.
 */

var BLACKLIST_WORDS = [
  'cambio',
  'vendid[oa]',
  'retirad[oa]',
  'ya no',
  'encontrad[oa]',
  'busc[oa]',
  'descartad[oa]',
  'compr[oa]',
  'comprad[oa]',
  'cerrad[oa]',
  'cerra[rd]',
  '^\.[.]*$'
]

var regex = new RegExp(BLACKLIST_WORDS.join('|'), 'i')

function isBlacklist (str) {
  return str.length > 0 && !(regex.test(str))
}

isBlacklist.regex = regex

module.exports = isBlacklist
