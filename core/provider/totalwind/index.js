'use strict'

const CONFIG = require('config').totalwind_api
const { get, assign } = require('lodash')

const totalwindOpts = assign({}, CONFIG, {
  key: get(global, CONFIG.key)
})

const CONST = {
  REQUIRED_PARAMS: ['path']
}

const checkRequiredParams = require('../../util/check-required-params')
const totalwind = require('totalwind-api')(totalwindOpts)
const createProvider = require('../create')

function createTotalwindProvider (opts) {
  checkRequiredParams(opts, CONST.REQUIRED_PARAMS)
  const { seller, path } = opts

  return createProvider(opts, function (done) {
    const { extract } = this
    const stream = totalwind.purchase[seller][path]()

    stream.on('data', extract).on('error', done).on('end', done)
  })
}

module.exports = createTotalwindProvider
