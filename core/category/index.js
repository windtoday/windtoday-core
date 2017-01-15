'use strict'

const { get } = require('lodash')

const CATEGORIES_SINGULAR = require('./categories_singular.json')
const CATEGORIES = require('./categories.json')

function createFactory (categories) {
  function category (key) {
    const category = get(categories, key, categories.others)
    return category
  }

  return category
}

const categories = createFactory(CATEGORIES)
categories.singular = createFactory(CATEGORIES_SINGULAR)

module.exports = categories
