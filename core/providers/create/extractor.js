'use strict'

const isBlacklisted = require('../../schema/is-blacklisted')
const priceExtractor = require('../../identify/price')
const yearExtractor = require('../../identify/year')
const { merge } = require('lodash')

function createExtractor (opts) {
  const { add, extract } = opts

  function extractor (data) {
    const { title } = data
    if (isBlacklisted(title)) return

    const basicExtractor = {
      price: priceExtractor(title),
      year: yearExtractor(title)
    }

    const item = merge(data, basicExtractor, extract(title))

    add(item)
  }

  return extractor
}

module.exports = createExtractor
