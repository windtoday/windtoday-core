'use strict'

const cleanWhiteSpaces = require('condense-whitespace')
const {assignIn, assign} = require('lodash')
const EventEmitter = require('events')

const isBlacklisted = require('../../schema/is-blacklisted')
const titleizeProps = require('../../util/titleize-props')
const createFlow = require('../../identify/create-flow')
const identify = require('../../identify')

const generalExtractor = createFlow([
  // TODO: Juse use the specific identifiers
  // if the field is not provided
  identify.price,
  identify.year
])

function createExtractor (opts) {
  const { seller, provider, path, log } = opts
  const emitter = new EventEmitter()
  const specificExtractor = identify({path, log})

  const extract = createFlow([
    generalExtractor,
    specificExtractor
  ])

  function extractor (rawItem) {
    const {title: rawTitle} = rawItem
    if (isBlacklisted(rawTitle)) return

    const item = titleizeProps(rawItem)
    const title = cleanWhiteSpaces(item.title)
    const {data} = extract(title)
    const doc = assign(item, {seller, provider, path}, data)
    emitter.emit('data', doc)
  }

  return assignIn(extractor, emitter)
}

module.exports = createExtractor
