'use strict'

const CONFIG = require('config').totalwind_api
const { assign, bind } = require('lodash')

const totalwindOpts = assign({}, CONFIG, {
  key: process.env[CONFIG.key]
})

const CONST = {
  REQUIRED_PARAMS: [ 'type', 'category' ]
}

const checkRequiredParams = require('../../util/check-required-params')
const totalwind = require('totalwind-api')(totalwindOpts)
const createProvider = require('../create-provider')
const createExtractor = require('./extractor')

function createTotalwindProvider (opts) {
  checkRequiredParams(opts, CONST.REQUIRED_PARAMS)
  const { type, category } = opts

  return createProvider({
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
