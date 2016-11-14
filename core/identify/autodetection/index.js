'use strict'

const getIdentifiers = require('./identifiers')
const getCategories = require('../category')
const { assign } = require('lodash')

const createFlow = require('../create-flow')

function createAutodetection (loggerKeyword) {
  function autodetect (str) {
    const {data, output} = getCategories(str)
    const identifiers = getIdentifiers(data)
    const flow = createFlow({loggerKeyword, identifiers})
    const detection = flow(output)

    detection.data.category = data
    assign(detection.data, {category: data})
    return detection
  }

  return autodetect
}

module.exports = createAutodetection
