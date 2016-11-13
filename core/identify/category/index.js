'use strict'

const { forEach, bind, size, reduce } = require('lodash')
const category = require('../../category')
const strmatch = require('str-match')

const CONST = {
  REGEX: {
    sails: RegExp(require('./sails.json').join('|'), 'i'),
    boards: RegExp(require('./boards.json').join('|'), 'i'),
    fins: RegExp(require('./fins.json').join('|'), 'i'),
    masts: RegExp(require('./masts.json').join('|'), 'i'),
    booms: RegExp(require('./booms.json').join('|'), 'i')
  },

  FALLBACK_CATEGORY: category('others')
}

function getCategories (str) {
  const categories = reduce(CONST.REGEX, function (acc, regex, category) {
    const detection = strmatch(acc.output, regex)
    if (detection.test) acc.data.push(category)
    acc.output = detection.output
    return acc
  }, { data: [], output: str })

  if (!size(categories.data)) categories.data.push(CONST.FALLBACK_CATEGORY)

  return categories
}

// forEach(identify, function (value, key) {
//   getCategories[key] = value
// })

module.exports = getCategories
