'use strict'

const { get, mapKeys, includes } = require('lodash')

const CATEGORY_SINGULAR = require('../category').singular

const MAP_KEYS = ['carbon', 'size', 'type']

function serializer (obj) {
  const category = CATEGORY_SINGULAR(get(obj, 'category'))
  return mapKeys(
    obj,
    (value, key) => (includes(MAP_KEYS, key) ? `${category} ${key}` : key)
  )
}

module.exports = serializer
