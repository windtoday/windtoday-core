'use strict'

var sails = require('windtoday-sails')
var lodash = require('lodash')

var regex = lodash.memoize(function createRegex (pattern) {
  return new RegExp(pattern)
})

function sail (str) {
  var sail = lodash.find(sails, function (sail) {
    return regex(sail.brand.regex).test(str)
  })

  var brandName = lodash.get(sail, 'brand.name')

  if (!brandName) return

  var models = lodash.get(sail, 'models')

  var model = lodash.chain(models)
    .find(function (model) {
      return regex(model.regex).test(str)
    })
    .get('name')
    .value()

  return lodash.merge({}, {name: brandName}, {model: model})
}

sail.size = require('./size')

module.exports = sail
