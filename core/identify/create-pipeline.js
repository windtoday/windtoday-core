'use strict'

const { forEach, size } = require('lodash')
const category = require('../category')

function isValid (obj) {
  return size(obj) > 1
}

function createPipeline (identifiers) {
  function identify (str) {
    var result = { category: category.others }

    forEach(identifiers, function (identify) {
      var item = identify(str)

      if (isValid(item)) {
        result = item
        return false
      }
    })

    return result
  }

  return identify
}

module.exports = createPipeline
