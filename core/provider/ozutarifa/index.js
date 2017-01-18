'use strict'

const CONFIG = require('config').ozutarifa_api
const { assign, get } = require('lodash')
const exists = require('existential')

const ozutarifaOpts = assign({}, CONFIG, {
  key: get(global, CONFIG.key)
})

const CONST = {
  REQUIRED_PARAMS: [ 'path' ]
}

const checkRequiredParams = require('../../util/check-required-params')
const ozutarifa = require('ozutarifa-api')(ozutarifaOpts)
const createProvider = require('../create')

function createTotalwindProvider (opts) {
  checkRequiredParams(opts, CONST.REQUIRED_PARAMS)
  const {path, seller} = opts

  return createProvider(opts, function (done) {
    const { extract } = this
    const stream = ozutarifa[seller][path]()

    function extractor (item) {
      const {year, price} = item
      const createdAt = Date.now()

      let {title} = item
      if (exists(year)) title = `${title} ${year}`
      if (exists(price)) title = `${title} €${price}`

      const doc = assign(item, {title, createdAt})
      return extract(doc)
    }

    stream
      .on('data', extractor)
      .on('error', done)
      .on('end', done)
  })
}

module.exports = createTotalwindProvider
