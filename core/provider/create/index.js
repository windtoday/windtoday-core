'use strict'

const { assign, bind, get, partial } = require('lodash')
const { waterfall, reduce } = require('async')

const createExtractor = require('./create-extractor')
const createContext = require('./create-context')
const createAdd = require('./create-add')
const share = require('../../share')
const db = require('../../db')

const env = get(process, 'env.NODE_ENV', 'development')

function createProvider (opts, fetch) {
  const { provider, seller, path, share: isShareable } = opts
  const key = `${env}:${provider}:${seller}:${path}`

  const ctx = createContext(opts)
  const add = createAdd(ctx)
  const buffer = []
  const extract = ctx.extract = createExtractor(assign({buffer}, opts))

  fetch = bind(fetch, ctx)
  extract.on('data', (item) => buffer.push(item))

  function init (cb) {
    const tasks = [
      fetch,
      partial(reduce, buffer, [], add),
      function updateDatabase (docs, next) {
        return db.add({key, docs}, next)
      },
      function shareLinks (docs, stats, next) {
        if (!isShareable) return next(null, stats)
        return share(docs, (err) => next(err, stats))
      }
    ]

    return waterfall(tasks, cb)
  }

  return init
}

module.exports = createProvider
