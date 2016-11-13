'use strict'

const getIdentifiers = require('./identifiers')
const getCategories = require('../category')
const pipeline = require('./pipeline')
const { assign } = require('lodash')

function createAutodetection (loggerKeyword) {
  function autodetect (str) {
    const {data, output} = getCategories(str)
    const identifiers = getIdentifiers(data)
    const detection = pipeline(output, loggerKeyword, identifiers)

    detection.data.category = data
    assign(detection.data, {category: data})
    return detection
  }

  return autodetect
}

module.exports = createAutodetection
