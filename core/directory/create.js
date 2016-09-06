'use strict'

const { get, find, chain } = require('lodash')

function regex (pattern) {
  return new RegExp(pattern, 'i')
}

function createDirectory (data) {
  function directory (str) {
    return find(data, function (item) {
      return regex(item.brand.regex).test(str)
    })
  }

  directory.model = function getModel (item, str) {
    const models = get(item, 'models')

    return chain(models)
      .find(function (model) {
        return regex(model.regex).test(str)
      })
      .get('name')
      .value()
  }

  directory.brand = function getBrand (item) {
    return get(item, 'brand.name')
  }

  return directory
}

module.exports = createDirectory
