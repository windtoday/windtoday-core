'use strict'

const category = require('../../category')
const { map, get } = require('lodash')
const identify = require('..')

function noop () {
  return function (str) {
    return { data: undefined, output: str }
  }
}

function identifiers (categories) {
  return map(categories, function (name) {
    const fn = get(identify, category.singular(name), noop)
    return {name, fn}
  })
}

module.exports = identifiers
