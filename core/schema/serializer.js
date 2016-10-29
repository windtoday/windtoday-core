'use strict'

const { get, mapKeys, includes } = require('lodash')

const CATEGORY_SINGULAR = require('../category').singular

const MAP_KEYS = ['size']

function serializer (obj) {
  const namespace = CATEGORY_SINGULAR(get(obj, 'category'))

  return mapKeys(obj, function (value, key) {
    if (includes(MAP_KEYS, key)) return `${namespace}.${key}`
    return key
  })
}

module.exports = serializer
