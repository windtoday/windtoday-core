'use strict'

const CONFIG = require('config').totalwind_api
const { assign, bind } = require('lodash')
const { each } = require('async')

const totalwindOpts = assign({}, CONFIG, {
  key: process.env[CONFIG.key]
})

const totalwind = require('totalwind-api')(totalwindOpts)
const createExtractor = require('./extractor')

const CONST = {
  CATEGORIES: [
    'sails',
    'boards'
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
    each(CONST.CATEGORIES, function (category, next) {
      const extractor = bind(createExtractor(CONST.TYPE, category), self)
      const reqStream = totalwind.purchase[CONST.TYPE][category]()
      reqStream
        .on('data', extractor)
        .on('error', next)
        .on('end', next)
    }, cb)
  }
}
