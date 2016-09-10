'use strict'

const should = require('should')
const log = require('../../../core/log')('board_brand_unidentify')
const board = require('../../../core/identify/board')(log)

function brand (str) {
  return board(str).brand
}

describe('identify » board » brand', function () {
  it('not detect', function () {
    [
      ''
    ].forEach(function (str) {
      should(brand(str)).be.undefined()
    })
  })

  it('detect', function () {
    [
      'starboard futura'
    ].forEach(function (str) {
      brand(str).should.be.equal('Starboard')
    })
  })
})
