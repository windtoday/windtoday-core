'use strict'

const CONFIG = require('config').totalwind_api
const { assign } = require('lodash')

const totalwindOpts = assign({}, CONFIG, {
  key: process.env[CONFIG.key]
})

const CONST = {
  REQUIRED_PARAMS: [ 'category' ]
}

const checkRequiredParams = require('../../util/check-required-params')
const totalwind = require('totalwind-api')(totalwindOpts)
const createSpecificExtractor = require('./extractor')
const createProvider = require('../create')

function createTotalwindProvider (opts) {
  checkRequiredParams(opts, CONST.REQUIRED_PARAMS)

  const {type, provider} = opts
  const specificExtractor = createSpecificExtractor(opts)

  return createProvider(assign({}, opts, {
    start: function (done) {
      const {category, extract} = this
      const stream = totalwind.purchase[type][category]()

      stream
        .on('data', extract)
        .on('error', done)
        .on('end', done)
    },

    extract: function (data) {
      return assign({type, provider}, data, specificExtractor(data))
    }
  }))
}

module.exports = createTotalwindProvider
