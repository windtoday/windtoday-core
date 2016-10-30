'use strict'

const identifyCategory = require('./category')
const { get, merge, noop } = require('lodash')
const categories = require('../category')
const createLogger = require('../log')
const noopIdentifier = () => noop
const identify = require('.')

function createCategoryLogger (loggerKeyword, category) {
  return createLogger(`${loggerKeyword}_autodetection_${category}_unidentify`)
}

/**
 * It autodetect the category based on keywords matching
 * and it applies the specific extractor.
 *
 * TODO: Consider that a string can contains more than one item.
 * Execute autodetection, remove the detected substring and execute
 * again for detect more ads inside the original ad.
 *
 */
function createAutodetection (loggerKeyword) {
  function autodetect (str) {
    const category = identifyCategory(str)
    const identifier = get(identify, categories.singular(category), noopIdentifier)
    const log = createCategoryLogger(loggerKeyword, category)
    const detection = identifier(log)(str)
    return merge({ category }, detection)
  }

  return autodetect
}

module.exports = createAutodetection
