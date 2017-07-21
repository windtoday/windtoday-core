'use strict'

const CONFIG = require('config').bigsurfshop_api
const { assign, get } = require('lodash')

const bigsurfshopOpts = assign({}, CONFIG, {
  key: get(global, CONFIG.key)
})

const CONST = {
  REQUIRED_PARAMS: ['path']
}

const checkRequiredParams = require('../../util/check-required-params')
const bigsurfshop = require('bigsurfshop-api')(bigsurfshopOpts)
const createProvider = require('../create')

function createTelstarsurfProvider (opts) {
  checkRequiredParams(opts, CONST.REQUIRED_PARAMS)
  const { path, seller } = opts

  return createProvider(opts, function (done) {
    const { extract } = this
    const stream = bigsurfshop[path][seller]()

    stream.on('data', extract).on('error', done).on('end', done)
  })
}

module.exports = createTelstarsurfProvider
