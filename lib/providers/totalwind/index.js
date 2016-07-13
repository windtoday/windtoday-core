'use strict'

var createExtractor = require('./extractor')
var totalwind = require('totalwind-api')(require('CONFIG').totalwind_api)
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
  ]
}

module.exports = {
  name: 'totalwind',
  start: function (cb) {
    var reqStream = totalwind.purchase.particular.sails()
    var extractor = createExtractor('particular', 'sails').bind(this)
    reqStream.on('data', extractor)

    // async.each(CONST.CATEGORIES, function (category, next) {
    //   var reqStream = totalwind.purchase.particular[category]()

  // reqStream
  // .on('data', function (data) {
  // console.log(data)
  // data.type = 'particular'
  // data.source = 'totalwind'
  // data.category = category
  //
  // self.validate(data, function (validationError, instance) {
  //   ++self.stats.total
  //   if (!validationError) {
  //     self.log.success('category=%s, title=%s', instance.category, instance.title)
  //     ++self.stats.valid
  //     self.add(instance)
  //   } else {
  //     self.log.error(validationError)
  //   }
  // })
  // })
  // .on('end', next)
  // .on('error', next)
  // }, cb)
  }
}
