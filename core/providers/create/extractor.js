'use strict'

const isBlacklisted = require('../../schema/is-blacklisted')
const cleanWhiteSpaces = require('condense-whitespace')
const priceExtractor = require('../../identify/price')
const yearExtractor = require('../../identify/year')
const { assign, partial } = require('lodash')

function createExtractor (opts) {
  const { add, extract, buffer } = opts

  function extractor (data) {
    const title = cleanWhiteSpaces(data.title)

    if (isBlacklisted(title)) return

    const basicExtractor = {
      price: priceExtractor(title),
      year: yearExtractor(title)
    }

    const item = assign(data, basicExtractor, extract(title))
    buffer.push(partial(add, item))
  }

  return extractor
}

module.exports = createExtractor
