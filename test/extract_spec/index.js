'use strict'

var extract = require('../../core/extract')

describe('extract', function () {
  require('./price')(extract)
  require('./year')(extract)

  describe('sail', function () {
    require('./sail/brand')(extract)
    require('./sail/model')(extract)
    require('./sail/size')(extract)
  })
})
