'use strict'

/**
 * Blacklist of keywords to prevent add not interesting topics.
 */

var BLACKLIST_WORDS = [
  '^.[.]*$',
  'borrad[oa]',
  'borrar',
  'busc[oa]',
  'cambio',
  'cancelad[oa]',
  'cerra[rd]',
  'cerrad[oa]',
  'compr[oa]',
  'comprad[oa]',
  'descartad[oa]',
  'eliminad[oa]',
  'encontrad[oa]',
  'retirad[oa]',
  'vendid[oa]',
  'ya no'
]

var regex = new RegExp(BLACKLIST_WORDS.join('|'), 'i')

function isBlacklisted (str) {
  return str.length && regex.test(str)
}

isBlacklisted.regex = regex

module.exports = isBlacklisted
