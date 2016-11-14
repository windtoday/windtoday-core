'use strict'

const isBlacklisted = require('../../schema/is-blacklisted')
const cleanWhiteSpaces = require('condense-whitespace')
const createFlow = require('../../identify/create-flow')
const price = require('../../identify/price')
const year = require('../../identify/year')
const { assign, partial, omit } = require('lodash')

const basicExtractor = createFlow({
  identifiers: [
    {fn: price, name: 'price'},
    {fn: year, name: 'year'}
  ]
})

function createExtractor (opts) {
  const { add, extract, buffer } = opts

  function extractor (raw) {
    const title = cleanWhiteSpaces(raw.title)
    if (isBlacklisted(title)) return

    const {data, output} = basicExtractor(title)
    const specificExtractor = extract(output)

    const item = assign(
      raw,
      data,
      omit(specificExtractor, ['data', 'output']),
      specificExtractor.data
    )

    buffer.push(partial(add, item))
  }

  return extractor
}

module.exports = createExtractor
