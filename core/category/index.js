'use strict'

const CATEGORIES = require('./categories.json')
const { get, forEach, lowerCase } = require('lodash')

function category (str) {
  const key = lowerCase(str)
  const category = get(CATEGORIES, key, CATEGORIES.others)
  return category
}

forEach(CATEGORIES, function (value, key) {
  category[value] = key
})

module.exports = category
