'use strict'

const identifyCategory = require('./category')
const { get, merge, noop } = require('lodash')
const categories = require('../category')
const noopIdentifier = () => noop
const identify = require('.')

/**
 * It autodetect the category based on keywords matching
 * and it applies the specific extractor.
 */
function createAutodetection (log) {
  function autodetect (str) {
    const category = identifyCategory(str)
    const identifier = get(identify, categories.singular(category), noopIdentifier)
    const detection = identifier(log)(str)
    return merge({ category }, detection)
  }

  return autodetect
}

module.exports = createAutodetection
