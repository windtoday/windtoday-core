'use strict'

const CONFIG = require('config').totalwind_api
const { assign, bind } = require('lodash')

const totalwindOpts = assign({}, CONFIG, {
  key: process.env[CONFIG.key]
})

const totalwind = require('totalwind-api')(totalwindOpts)
const createExtractor = require('./extractor')
const createProvider = require('../create-provider')

const CONST = {
  PROVIDER_NAME: 'totalwind'
}

function createTotalwindProvider (type, category) {
  return createProvider({
    name: CONST.PROVIDER_NAME,
    start: function (done) {
      const self = this
      const extractor = bind(createExtractor(type, category), self)
      const stream = totalwind.purchase[type][category]()
      stream
        .on('data', extractor)
        .on('error', done)
        .on('end', done)
    }
  })
}

module.exports = createTotalwindProvider
