'use strict'

const { get, forEach, lowerCase } = require('lodash')
const CATEGORIES = require('./categories.json')

function category (str) {
  const key = lowerCase(str)
  const category = get(CATEGORIES, key, CATEGORIES.others)
  return category
}

forEach(CATEGORIES, function (value, key) {
  category[value] = key
})

module.exports = category
