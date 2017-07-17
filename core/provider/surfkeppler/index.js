'use strict'

const CONFIG = require('config').surfkeppler_api
const { assign, get } = require('lodash')

const surfkepplerOpts = assign({}, CONFIG, {
  key: get(global, CONFIG.key)
})

const CONST = {
  REQUIRED_PARAMS: ['path']
}

const checkRequiredParams = require('../../util/check-required-params')
const surfkeppler = require('surfkeppler-api')(surfkepplerOpts)
const createProvider = require('../create')

function createTelstarsurfProvider (opts) {
  checkRequiredParams(opts, CONST.REQUIRED_PARAMS)
  const { path, seller } = opts

  return createProvider(opts, function (done) {
    const { extract } = this
    const stream = surfkeppler[path][seller]()

    stream.on('data', extract).on('error', done).on('end', done)
  })
}

module.exports = createTelstarsurfProvider
