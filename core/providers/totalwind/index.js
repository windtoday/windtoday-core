'use strict'

const CONFIG = require('config').totalwind_api
const { assign } = require('lodash')

const totalwindOpts = assign({}, CONFIG, {
  key: process.env[CONFIG.key]
})

const CONST = {
  REQUIRED_PARAMS: [ 'path' ]
}

const checkRequiredParams = require('../../util/check-required-params')
const totalwind = require('totalwind-api')(totalwindOpts)
const createSpecificExtractor = require('./extractor')
const createProvider = require('../create')

function createTotalwindProvider (opts) {
  checkRequiredParams(opts, CONST.REQUIRED_PARAMS)

  const {type, provider, path} = opts
  const specificExtractor = createSpecificExtractor(opts)

  return createProvider(assign({}, opts, {
    start: function (done) {
      const { extract } = this
      const stream = totalwind.purchase[type][path]()

      stream
        .on('data', extract)
        .on('error', done)
        .on('end', done)
    },

    extract: function (str) {
      return assign({type, provider, path}, specificExtractor(str))
    }
  }))
}

module.exports = createTotalwindProvider
