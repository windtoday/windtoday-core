'use strict'

var createExtractor = require('./extractor')
var CONFIG = require('config').totalwind_api

var totalwindOpts = Object.assign({}, CONFIG, {
  key: process.env[CONFIG.key]
})

var totalwind = require('totalwind-api')(totalwindOpts)
var lodash = require('lodash')
var async = require('async')

var CONST = {
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
    var self = this
    async.each(CONST.CATEGORIES, function (category, next) {
      var extractor = lodash.bind(createExtractor(CONST.TYPE, category), self)
      var reqStream = totalwind.purchase[CONST.TYPE][category]()
      reqStream
        .on('data', extractor)
        .on('error', next)
        .on('end', next)
    }, cb)
  }
}
