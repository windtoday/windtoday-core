'use strict'

const { get, find, chain } = require('lodash')
const sails = require('windtoday-sails')
const regex = require('../util/regex')

function directory (str) {
  return find(sails, function (sail) {
    return regex(sail.brand.regex).test(str)
  })
}

directory.model = function getModel (sail, str) {
  const models = get(sail, 'models')

  return chain(models)
    .find(function (model) {
      return regex(model.regex).test(str)
    })
    .get('name')
    .value()
}

directory.brand = function getBrand (sail) {
  return get(sail, 'brand.name')
}

module.exports = directory
