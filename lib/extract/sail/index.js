'use strict'

var log = require('../../log')('extract_sail')
var sails = require('windtoday-sails')
var lodash = require('lodash')
var sailSize = require('./size')

var regex = lodash.memoize(function createRegex (pattern) {
  return new RegExp(pattern, 'i')
})

function sail (str) {
  var result = {}

  var size = sailSize(str)
  if (size) result.size = size
  else log.warn('unmatching size', {title: str})

  var identifySail = lodash.find(sails, function (sail) {
    return regex(sail.brand.regex).test(str)
  })

  result.brand = lodash.get(identifySail, 'brand.name')

  if (!result.brand) {
    log.warn('unmatching brand', {title: str})
    return result
  }

  var models = lodash.get(identifySail, 'models')

  var model = lodash.chain(models)
    .find(function (model) {
      return regex(model.regex).test(str)
    })
    .get('name')
    .value()

  if (model) result.model = model
  else log.warn('unmatching model', {brand: result.brand, title: str})

  return result
}

module.exports = sail
