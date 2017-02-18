'use strict'

const CONFIG = require('config').easysurfshop_api
const { assign, get } = require('lodash')

const easysurfshopOpts = assign({}, CONFIG, {
  key: get(global, CONFIG.key)
})

const CONST = {
  REQUIRED_PARAMS: [ 'path' ]
}

const checkRequiredParams = require('../../util/check-required-params')
const easysurfshop = require('easysurfshop-api')(easysurfshopOpts)
const createProvider = require('../create')

function createTelstarsurfProvider (opts) {
  checkRequiredParams(opts, CONST.REQUIRED_PARAMS)
  const {path, seller} = opts

  return createProvider(opts, function (done) {
    const { extract } = this
    const stream = easysurfshop[path][seller]()

    stream
      .on('data', extract)
      .on('error', done)
      .on('end', done)
  })
}

module.exports = createTelstarsurfProvider
