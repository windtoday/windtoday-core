'use strict'

var totalwind = require('totalwind-api')(require('CONFIG').totalwind_api)
var async = require('async')

var CONST = {
  CATEGORIES: [
    'boards',
    'sails',
    'accesories',
    'others',
    'surf',
    'formula'
  ]
}

module.exports = {
  name: 'totalwind',
  start: function (cb) {
    var self = this

    var reqStream = totalwind.purchase.particular.boards()

    reqStream.on('data', function (data) {
      data.type = 'particular'
      data.provider = 'totalwind'
      data.category = 'particular'

      console.log(data)

      self.validate(data, function (validationError, instance) {
        console.log(arguments)
        throw 'e'
      })
    })

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
