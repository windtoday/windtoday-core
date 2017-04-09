'use strict'

const { size, reduce } = require('lodash')
const strmatch = require('str-match')()

const regexWordBoundary = require('regex-word-boundary')
const category = require('../../category')

const CONST = {
  REGEX: {
    sails: regexWordBoundary(require('./sails.json')),
    boards: regexWordBoundary(require('./boards.json')),
    fins: regexWordBoundary(require('./fins.json')),
    masts: regexWordBoundary(require('./masts.json')),
    booms: regexWordBoundary(require('./booms.json'))
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

module.exports = getCategories
