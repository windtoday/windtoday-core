'use strict'

const getIdentifiers = require('./identifiers')
const getCategories = require('../category')
const createFlow = require('../create-flow')
const { assign } = require('lodash')

function createAutodetection (loggerKeyword) {
  function autodetect (str) {
    const {data: categories, output} = getCategories(str)
    const identifiers = getIdentifiers(categories)
    const flow = createFlow(identifiers)
    const detection = flow(output)
    assign(detection.data, {category: categories})
    return detection
  }

  return autodetect
}

module.exports = createAutodetection
