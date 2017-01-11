'use strict'

const category = require('../../category')
const { map } = require('lodash')

function identifiers (categories, log) {
  return map(categories, function (name) {
    const factory = require(`../${category.singular(name)}`)
    return factory(log)
  })
}

module.exports = identifiers
