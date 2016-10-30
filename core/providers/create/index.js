'use strict'

const createExtractor = require('./extractor')
const createContext = require('./context')
const { bind } = require('lodash')
const createAdd = require('./add')
const { series } = require('async')

function createProvider (opts) {
  const { extract } = opts
  const ctx = createContext(opts)
  const add = createAdd(ctx)
  const buffer = []
  ctx.extract = createExtractor({add, extract, buffer})
  const start = bind(opts.start, ctx)

  function init (cb) {
    start(function (err) {
      if (err) return cb(err)
      series(buffer, function (err) {
        return cb(err, ctx.stats)
      })
    })
  }

  return init
}

module.exports = createProvider
