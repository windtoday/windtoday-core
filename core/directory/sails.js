'use strict'

var sails = require('windtoday-sails')
var regex = require('../util/regex')
var lodash = require('lodash')

function find (str) {
  return lodash.find(sails, function (sail) {
    return regex(sail.brand.regex).test(str)
  })
}

function getModel (sail, str) {
  var models = lodash.get(sail, 'models')
  return lodash.chain(models)
    .find(function (model) {
      return regex(model.regex).test(str)
    })
    .get('name')
    .value()
}

function getBrand (sail) {
  return lodash.get(sail, 'brand.name')
}

module.exports = {
  find: find,
  getModel: getModel,
  getBrand: getBrand
}
