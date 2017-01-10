'use strict'

const createProvider = require('../create')
const createStream = require('./stream')

function createFacebookProvider (opts) {
  return createProvider(opts, function (done) {
    const { extract } = this
    const stream = createStream()
    stream
      .on('data', extract)
      .on('error', done)
      .on('end', done)
  })
}

module.exports = createFacebookProvider
