'use strict'

const identify = require('../../core/identify')

describe('identify', function () {
  require('./price')(identify)
  require('./year')(identify)

  describe('sail', function () {
    require('./sail/brand')(identify)
    require('./sail/model')(identify)
    require('./sail/size')(identify)
  })

  describe('board', function () {
    require('./board/brand')(identify)
    require('./board/model')(identify)
    require('./board/litres')(identify)
  })
})
