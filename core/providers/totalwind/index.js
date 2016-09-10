'use strict'

const CONFIG = require('config').totalwind_api
const { assign, bind } = require('lodash')

const totalwindOpts = assign({}, CONFIG, {
  key: process.env[CONFIG.key]
})

const totalwind = require('totalwind-api')(totalwindOpts)
const createProvider = require('../create-provider')
const createExtractor = require('./extractor')

const CONST = {
  PROVIDER_NAME: 'totalwind'
}

const log = require('../../log')(CONST.PROVIDER_NAME)

function createTotalwindProvider (opts) {
  const { type, category } = opts

  return createProvider({
    name: CONST.PROVIDER_NAME,
    log,
    start: function (done) {
      const extractor = bind(createExtractor(opts), this)
      const stream = totalwind.purchase[type][category]()

      stream
        .on('data', extractor)
        .on('error', done)
        .on('end', done)
    }
  })
}

module.exports = createTotalwindProvider
