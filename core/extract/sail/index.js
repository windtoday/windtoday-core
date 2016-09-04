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
  if (!sail) {
    log.warn('undetected sail', {title: str})
    return result
  }

  if (!sail.brand) {
    log.warn('unmatching brand', {title: str})
    return result
  }

  result.brand = lodash.get(sail, 'brand.name')

  var model = getModel(str, sail)
  if (!model) log.warn('unmatching model', {brand: result.brand, title: str})
  else result.model = model

  return result
}

module.exports = sail
