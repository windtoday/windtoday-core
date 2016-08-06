'use strict'

var log = require('../../log')('sail_extractor')
var sails = require('windtoday-sails')
var extractSailSize = require('./size')
var lodash = require('lodash')

var regex = lodash.memoize(function createRegex (pattern) {
  return new RegExp(pattern, 'i')
})

function sail (str) {
  var result = {}

  var sailSize = extractSailSize(str)
  if (sailSize) result.sailSize = sailSize
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
