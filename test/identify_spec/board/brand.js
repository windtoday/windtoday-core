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
    ].forEach(function (title) {
      should(brand({title})).be.undefined()
    })
  })

  it('detect', function () {
    [
      'starboard futura'
    ].forEach(function (title) {
      brand({title}).should.be.equal('Starboard')
    })
  })
})
