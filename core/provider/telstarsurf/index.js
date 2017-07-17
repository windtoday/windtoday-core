'use strict'

const CONFIG = require('config').telstarsurf_api
const { assign, get } = require('lodash')

const telstarsurfOpts = assign({}, CONFIG, {
  key: get(global, CONFIG.key)
})

const CONST = {
  REQUIRED_PARAMS: ['path']
}

const checkRequiredParams = require('../../util/check-required-params')
const telstarsurf = require('telstarsurf-api')(telstarsurfOpts)
const createProvider = require('../create')

function createTelstarsurfProvider (opts) {
  checkRequiredParams(opts, CONST.REQUIRED_PARAMS)
  const { path, seller } = opts

  return createProvider(opts, function (done) {
    const { extract } = this
    const stream = telstarsurf[path][seller]()

    stream.on('data', extract).on('error', done).on('end', done)
  })
}

module.exports = createTelstarsurfProvider
