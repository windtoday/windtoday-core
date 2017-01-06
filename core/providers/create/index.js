'use strict'

const createExtractor = require('./create-extractor')
const createContext = require('./create-context')
const { bind, get, partial } = require('lodash')
const { waterfall, reduce } = require('async')
const createAdd = require('./create-add')
const db = require('../../db')

const env = get(process, 'env.NODE_ENV', 'development')

function createProvider (opts) {
  const { extract, provider, seller, path } = opts
  const key = `${env}:${provider}:${seller}:${path}`
  const ctx = createContext(opts)
  const add = createAdd(ctx)
  const buffer = []

  ctx.extract = createExtractor({extract, buffer})

  const start = bind(opts.start, ctx)

  function init (cb) {
    const tasks = [
      start,
      partial(reduce, buffer, [], add),
      function update (docs, next) {
        return db.add({key, docs}, next)
      }
    ]

    return waterfall(tasks, cb)
  }

  return init
}

module.exports = createProvider
