'use strict'

const should = require('should')
const sail = require('../../../core/identify/sail')

function brand (str) {
  return sail(str).brand
}

describe('identify » sail » brand', function () {
  it('not detect', function () {
    [
      ''
    ].forEach(function (str) {
      should(brand(str)).be.undefined()
    })
  })

  it('detect', function () {
    [
      'loftsails racing blade',
      'loft sails racingblade',
      'loft racing blade'
    ].forEach(function (str) {
      brand(str).should.be.equal('Loft')
    })
  })
})
