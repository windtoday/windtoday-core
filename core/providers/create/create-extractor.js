'use strict'

const isBlacklisted = require('../../schema/is-blacklisted')
const { concat, forEach, assign, omit } = require('lodash')
const createFlow = require('../../identify/create-flow')
const cleanWhiteSpaces = require('condense-whitespace')
const price = require('../../identify/price')
const year = require('../../identify/year')

const basicExtractor = createFlow({
  identifiers: [
    {fn: price, name: 'price'},
    {fn: year, name: 'year'}
  ]
})

function createDoc (raw, data, item) {
  return assign(
    raw,
    data,
    omit(item, ['data', 'output']),
    item.data
  )
}

function createExtractor (opts) {
  const { extract, buffer } = opts

  function extractor (raw) {
    const title = cleanWhiteSpaces(raw.title)
    if (isBlacklisted(title)) return

    const {data, output} = basicExtractor(title)
    const items = concat([], extract(output))

    forEach(items, (item) => {
      const doc = createDoc(raw, data, item)
      buffer.push(doc)
    })
  }

  return extractor
}

module.exports = createExtractor
