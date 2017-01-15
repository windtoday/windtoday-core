'use strict'

const { map } = require('lodash')

const category = require('../../category')

function identifiers (categories, log) {
  return map(categories, function (name) {
    const factory = require(`../${category.singular(name)}`)
    return factory(log)
  })
}

module.exports = identifiers
