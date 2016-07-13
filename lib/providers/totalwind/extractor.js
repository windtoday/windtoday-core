'use strict'

var extract = require('../../extract')
var lodash = require('lodash')

var CONST = {
  SOURCE_NAME: 'totalwind'
}

function createExtractor (type, category) {
  function extractor (data) {
    data.type = type
    data.provider = CONST.SOURCE_NAME
    data.category = category

    var raw = lodash.lowerCase(data.title)

    var dataExtract = {
      price: extract.price(raw),
      year: extract.year(raw)
    }

    if (lodash.isEqual(category, 'sails'))
      lodash.assign(dataExtract, extract.sail(raw))

    lodash.merge(data, dataExtract)

    this.validate(data, function (validationError, instance) {
      // l
      //
      //
      //
      // console.log(arguments)
      // throw 'e'
    })
  }

  return extractor
}

module.exports = createExtractor
