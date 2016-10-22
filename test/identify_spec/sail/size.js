'use strict'

const should = require('should')
const size = require('../../../core/identify/sail/size')

describe('identify » sail » size', function () {
  it('not detect', function () {
    [
      ''
    ].forEach(function (str) {
      should(size(str)).be.undefined()
    })
  })

  describe('detect separator variatons', function () {
    describe('simple', function () {
      describe('without decimals', function () {
        [
          '7m',
          '7 m'
        ].forEach(function (str) {
          it(str, function () {
            size(str).should.be.equal(7.0)
          })
        })
      })

      describe('with decimals', function () {
        [
          '7 0',
          '7.0',
          '7,0',
          "7'0",
          '7´0',
          '7 0m',
          '7.0m',
          '7,0m',
          "7'0m",
          '7´0m',
          '7 0 m',
          '7.0 m',
          '7,0 m',
          "7'0 m",
          '7´0 m'
        ].forEach(function (str) {
          it(str, function () {
            size(str).should.be.equal(7.0)
          })
        })
      })
    })

    describe('double', function () {
      describe('without decimals', function () {
        [
          '10m',
          '10 m'
        ].forEach(function (str) {
          it(str, function () {
            size(str).should.be.equal(10.0)
          })
        })
      })

      describe('with decimals', function () {
        [
          '10 2',
          '10.2',
          '10,2',
          "10'2",
          '10´2',
          '10 2m',
          '10.2m',
          '10,2m',
          "10'2m",
          '10´2m',
          '10 2 m',
          '10.2 m',
          '10,2 m',
          "10'2 m",
          '10´2 m'
        ].forEach(function (str) {
          it(str, function () {
            size(str).should.be.equal(10.2)
          })
        })
      })
    })
  })

  describe('special considerations', function () {
    it('in a string with model that finish in number', function () {
      const str = 'Vendo Neilpryde H2 7,2 2012 - 175€'
      size(str).should.be.equal(7.2)
    })

    it('in a string with model that finish in number separated with space', function () {
      const str = 'Vendo Neil Pryde Evo 6 8,6 2015 - 450€'
      size(str).should.be.equal(8.6)
    })

    it('in a string with mast dimensions', function () {
      const str = 'Vendo Vela Gaasta Vapor 11 m 2013 y Mastil Gaastra 520 75 '
      size(str).should.be.equal(11)
    })
  })
})
