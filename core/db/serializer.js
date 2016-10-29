'use strict'

const { get, mapKeys, includes } = require('lodash')
const OMIT_KEYS = ['category', 'brand', 'model']

function serializer (obj) {
  const namespace = get(obj, 'category')

  return mapKeys(obj, function (value, key) {
    if (includes(OMIT_KEYS, key)) return key
    return `${namespace}.${key}`
  })
}

module.exports = serializer
