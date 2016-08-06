'use strict'

var lodash = require('lodash')
var WORDS = require('./words.json')
var regex = new RegExp(WORDS.join('|'), 'i')

function trimWords (str) {
  return lodash.replace(str, regex, '')
}

trimWords.regex = regex

module.exports = lodash.flow(lodash.trim)
