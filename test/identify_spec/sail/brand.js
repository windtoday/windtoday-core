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
    ].forEach(function (title) {
      should(brand({title})).be.undefined()
    })
  })

  it('detect', function () {
    [
      'loftsails racing blade',
      'loft sails racingblade',
      'loft racing blade'
    ].forEach(function (title) {
      brand({title}).should.be.equal('Loft')
    })
  })
})
