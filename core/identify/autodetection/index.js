'use strict'

const getIdentifiers = require('./identifiers')
const getCategories = require('../category')
const pipeline = require('./pipeline')
const { assign } = require('lodash')

function createAutodetection (loggerKeyword) {
  function autodetect (str) {
    const categories = getCategories(str)
    const identifiers = getIdentifiers(categories)
    const detection = pipeline(str, loggerKeyword, identifiers)

    detection.data.category = categories
    assign(detection.data, {category: categories})
    return detection
  }

  return autodetect
}

module.exports = createAutodetection
