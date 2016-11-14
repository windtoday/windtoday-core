'use strict'

const createExtractor = require('./extractor')
const createProvider = require('../create')
const createStream = require('./stream')
const { assign } = require('lodash')

function createFacebookProvider (opts) {
  const {seller, provider, path} = opts
  const extractor = createExtractor(opts)

  return createProvider(assign({}, opts, {
    start: function (done) {
      const { extract } = this
      const stream = createStream()
      stream
        .on('data', extract)
        .on('error', done)
        .on('end', done)
    },
    extract: function (str) {
      return assign({seller, provider, path}, extractor(str))
    }
  }))
}

module.exports = createFacebookProvider
