'use strict'

const CONFIG = require('config').bellini_api
const { assign, get } = require('lodash')

const belliniOpts = assign({}, CONFIG, {
  key: get(global, CONFIG.key)
})

const CONST = {
  REQUIRED_PARAMS: ['path']
}

const checkRequiredParams = require('../../util/check-required-params')
const bellini = require('bellini-api')(belliniOpts)
const createProvider = require('../create')

function createBelliniProvider (opts) {
  checkRequiredParams(opts, CONST.REQUIRED_PARAMS)
  const { path, seller } = opts

  return createProvider(opts, function (done) {
    const { extract } = this
    const stream = bellini[path][seller]()

    stream.on('data', extract).on('error', done).on('end', done)
  })
}

module.exports = createBelliniProvider
