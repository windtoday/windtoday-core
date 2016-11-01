'use strict'

const should = require('should')
const { get } = require('lodash')
const log = require('../../../core/log')('sail_size_unidentify')
const sail = require('../../../core/identify/sail')(log)

describe('identify » sail » size', function () {
  it('not detect', function () {
    [
      ''
    ].forEach(function (str) {
      const sailDetected = sail(str)
      should(get(sailDetected, 'size')).be.undefined()
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
            const sailDetected = sail(str)
            get(sailDetected, 'size').should.be.equal(7.0)
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
            const sailDetected = sail(str)
            get(sailDetected, 'size').should.be.equal(7.0)
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
            const sailDetected = sail(str)
            get(sailDetected, 'size').should.be.equal(10.0)
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
            const sailDetected = sail(str)
            get(sailDetected, 'size').should.be.equal(10.2)
          })
        })
      })
    })
  })

  describe('special considerations', function () {
    it('in a string with year', function () {
      const str = 'Vela Goya Banzai 2016 5.3 350 P.i'
      const sailDetected = sail(str)
      get(sailDetected, 'size').should.be.equal(5.3)
    })

    it('in a string with price', function () {
      const str = 'Vendo EZZY WAVE SE 2005 80 € de 5.3'
      const sailDetected = sail(str)
      get(sailDetected, 'size').should.be.equal(5.3)
    })

    it('in a string with model that finish in number', function () {
      let str = 'Vendo Neilpryde H2 7,2 2012 - 175€'
      let sailDetected = sail(str)
      get(sailDetected, 'size').should.be.equal(7.2)

      str = 'Vendo Simmer X-type2 9,0 2008 - 190€'
      sailDetected = sail(str)
      get(sailDetected, 'size').should.be.equal(9.0)
    })

    it('in a string with brand and model that contains number', function () {
      const str = 'Point7 Ac2 8,3 2012'
      const sailDetected = sail(str)
      get(sailDetected, 'size').should.be.equal(8.3)
    })

    it('in a string with model that finish in number separated with space', function () {
      const str = 'Vendo Neil Pryde Evo 6 8,6 2015 - 450€'
      const sailDetected = sail(str)
      get(sailDetected, 'size').should.be.equal(8.6)
    })

    it('in a string with mast dimensions', function () {
      const str = 'Vendo Vela Gaasta Vapor 11 m 2013 y Mastil Gaastra 520 75 '
      const sailDetected = sail(str)
      get(sailDetected, 'size').should.be.equal(11)
    })
  })
})
