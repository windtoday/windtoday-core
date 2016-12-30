'use strict'

const getIdentifiers = require('./identifiers')
const getCategories = require('../category')
const { assign } = require('lodash')

const createFlow = require('../create-flow')

function createAutodetection (loggerKeyword) {
  function autodetect (str) {
    const {data: categories, output} = getCategories(str)
    const identifiers = getIdentifiers(categories)

    const flow = createFlow({loggerKeyword, identifiers})
    const detection = flow(output)
    assign(detection.data, {category: categories})

    return detection
  }

  return autodetect
}

module.exports = createAutodetection
