'use strict'

const should = require('should')
const board = require('../../../core/identify/board')

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
