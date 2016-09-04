'use strict'

var log = require('../../log')('sail_detector')
var regex = require('../../util/regex')
var sails = require('windtoday-sails')
var getSize = require('./size')
var lodash = require('lodash')

function getSail (str) {
  return lodash.find(sails, function (sail) {
    return regex(sail.brand.regex).test(str)
  })
}

function getModel (str, sail) {
  var models = lodash.get(sail, 'models')
  return lodash.chain(models)
    .find(function (model) {
      return regex(model.regex).test(str)
    })
    .get('name')
    .value()
}

function sail (str) {
  var result = {}

  var size = getSize(str)
  if (size) result.size = size
  else log.warn('unmatching size', {title: str})

  var sail = getSail(str)
  var brand = lodash.get(sail, 'brand.name')

  if (brand) result.brand = brand
  else {
    log.warn('unmatching brand', {title: str})
    return result
  }

  var model = getModel(str, sail)
  if (model) result.model = model
  else log.warn('unmatching model', {brand: result.brand, title: str})

  return result
}

module.exports = sail
