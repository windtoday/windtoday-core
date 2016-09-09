'use strict'

const should = require('should')
const litres = require('../../../core/identify/board/litres')

describe('identify » board » litres', function () {
  it('not detect', function () {
    [
      ''
    ].forEach(function (str) {
      should(litres(str)).be.undefined()
    })
  })

  it('two digits', function () {
    ;[
      '84l',
      '84 l',
      '84 litros'
    ].forEach(function (str) {
      litres(str).should.be.equal(84)
    })
  })

  it('three digits', function () {
    ;[
      '105l',
      '105 l',
      '105 litros'
    ].forEach(function (str) {
      litres(str).should.be.equal(105)
    })
  })

  it('detech in a string that include numbers', function () {
    [
      'Se vende Bic Techno 283 152l',
      'Se vende Bic Techno 283 152 l',
      'Se vende Bic Techno 283 152 litros'
    ].forEach(function (str) {
      litres(str).should.be.equal(152)
    })
  })
})
