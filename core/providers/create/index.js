'use strict'

const createExtractor = require('./extractor')
const createContext = require('./context')
const { waterfall, reduce } = require('async')
const db = require('../../db')
const { bind, partial } = require('lodash')
const createAdd = require('./add')

function createProvider (opts) {
  const { extract } = opts
  const ctx = createContext(opts)
  const add = createAdd(ctx)
  const buffer = []
  ctx.extract = createExtractor({extract, buffer})

  const start = bind(opts.start, ctx)

  function init (cb) {
    const tasks = [
      start,
      partial(reduce, buffer, [], add),
      bind(db.addObjects, db)
    ]

    waterfall(tasks, function (err) {
      return cb(err, ctx.stats)
    })
  }

  return init
}

module.exports = createProvider
