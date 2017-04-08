'use strict'

const CONFIG = require('config').lpwind_api
const { assign, get } = require('lodash')

const lpwindOpts = assign({}, CONFIG, {
  key: get(global, CONFIG.key)
})

const CONST = {
  REQUIRED_PARAMS: [ 'path' ]
}

const checkRequiredParams = require('../../util/check-required-params')
const lpwind = require('lpwind-api')(lpwindOpts)
const createProvider = require('../create')

function createTelstarsurfProvider (opts) {
  checkRequiredParams(opts, CONST.REQUIRED_PARAMS)
  const {path, seller} = opts

  return createProvider(opts, function (done) {
    const { extract } = this
    const stream = lpwind[path][seller]()

    stream
      .on('data', extract)
      .on('error', done)
      .on('end', done)
  })
}

module.exports = createTelstarsurfProvider
