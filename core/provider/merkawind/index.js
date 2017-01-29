'use strict'

const CONFIG = require('config').merkawind_api
const { get, assign } = require('lodash')

const merkawindOpts = assign({}, CONFIG, {
  key: get(global, CONFIG.key)
})

const CONST = {
  REQUIRED_PARAMS: [ 'path' ]
}

const checkRequiredParams = require('../../util/check-required-params')
const merkawind = require('merkawind-api')(merkawindOpts)
const createProvider = require('../create')

function createTotalwindProvider (opts) {
  checkRequiredParams(opts, CONST.REQUIRED_PARAMS)
  const {path} = opts

  return createProvider(opts, function (done) {
    const { extract } = this
    const stream = merkawind[path]()
    stream
      .on('data', extract)
      .on('error', done)
      .on('end', done)
  })
}

module.exports = createTotalwindProvider
