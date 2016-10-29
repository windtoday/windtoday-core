'use strict'

const CATEGORIES_SINGULAR = require('./categories_singular.json')
const CATEGORIES = require('./categories.json')
const { get, forEach, lowerCase } = require('lodash')

function createFactory (categories) {
  function category (str) {
    const key = lowerCase(str)
    const category = get(categories, key, categories.others)
    return category
  }

  return category
}

const categories = createFactory(CATEGORIES)
categories.singular = createFactory(CATEGORIES_SINGULAR)

forEach(CATEGORIES, function (value, key) {
  categories[value] = key
})

module.exports = categories
