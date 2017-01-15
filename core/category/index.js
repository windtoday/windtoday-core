'use strict'

const { get } = require('lodash')

const CATEGORIES_SINGULAR = require('./categories-singular.json')
const CATEGORIES_PLURAL = require('./categories-plural.json')

function createFactory (categories) {
  function category (key) {
    const category = get(categories, key, categories.others)
    return category
  }

  return category
}

const categories = createFactory(CATEGORIES_PLURAL)
categories.singular = createFactory(CATEGORIES_SINGULAR)

module.exports = categories
