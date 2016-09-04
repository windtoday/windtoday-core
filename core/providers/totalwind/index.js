'use strict'

const createExtractor = require('./extractor')
const CONFIG = require('config').totalwind_api

const totalwindOpts = Object.assign({}, CONFIG, {
  key: process.env[CONFIG.key]
})

const totalwind = require('totalwind-api')(totalwindOpts)
const lodash = require('lodash')
const async = require('async')

const CONST = {
  CATEGORIES: [
    'sails'
  // 'boards',
  // 'accesories',
  // 'others',
  // 'surf',
  // 'formula'
  ],
  TYPE: 'particular'
}

module.exports = {
  name: 'totalwind',
  start: function (cb) {
    const self = this
    async.each(CONST.CATEGORIES, function (category, next) {
      const extractor = lodash.bind(createExtractor(CONST.TYPE, category), self)
      const reqStream = totalwind.purchase[CONST.TYPE][category]()
      reqStream
        .on('data', extractor)
        .on('error', next)
        .on('end', next)
    }, cb)
  }
}
