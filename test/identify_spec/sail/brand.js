'use strict'

const should = require('should')
const log = require('../../../core/log')('sail_brand_unidentify')
const sail = require('../../../core/identify/sail')(log)

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
