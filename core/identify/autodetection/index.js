'use strict'

const { assign } = require('lodash')

const getIdentifiers = require('./identifiers')
const getCategories = require('../category')
const createFlow = require('../create-flow')

function createAutodetection (log) {
  function autodetect (str) {
    const { data: categories, output } = getCategories(str)
    const identifiers = getIdentifiers(categories, log)
    const flow = createFlow(identifiers)
    const detection = flow(output)
    assign(detection.data, { category: categories })
    return detection
  }

  return autodetect
}

module.exports = createAutodetection
