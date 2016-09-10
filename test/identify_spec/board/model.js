'use strict'

const should = require('should')
const log = require('../../../core/log')('board_brand_unidentify')
const board = require('../../../core/identify/board')(log)

function model (str) {
  return board(str).model
}

describe('identify » board » model', function () {
  it('not detect', function () {
    [
      ''
    ].forEach(function (str) {
      should(model(str)).be.undefined()
    })
  })

  it('detect', function () {
    [
      'starboard futura'
    ].forEach(function (str) {
      model(str).should.be.equal('Futura')
    })
  })
})
