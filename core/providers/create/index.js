'use strict'

const createExtractor = require('./extractor')
const createContext = require('./context')
const { bind } = require('lodash')
const createAdd = require('./add')

function createProvider (opts) {
  const { extract } = opts

  const ctx = createContext(opts)
  const add = createAdd(ctx)
  ctx.extract = createExtractor({add, extract})
  const start = bind(opts.start, ctx)

  function init (cb) {
    start(function (err) {
      return cb.apply(cb, [err, ctx.stats])
    })
  }

  return init
}

module.exports = createProvider
