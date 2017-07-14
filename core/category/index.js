'use strict'

const { get } = require('lodash')

const CATEGORIES_SINGULAR = require('./categories-singular.json')
const CATEGORIES_PLURAL = require('./categories-plural.json')

const createFactory = categories => key => {
  const category = get(categories, key, categories.others)
  return category
}

const categories = createFactory(CATEGORIES_PLURAL)
categories.singular = createFactory(CATEGORIES_SINGULAR)

module.exports = categories
