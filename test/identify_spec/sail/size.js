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
      const {data} = sail(str)
      should(get(data, 'size')).be.undefined()
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
            const {data, output} = sail(str)
            get(data, 'size').should.be.equal(7.0)
            output.includes(str).should.be.false()
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
            const {data, output} = sail(str)
            get(data, 'size').should.be.equal(7.0)
            output.includes(str).should.be.false()
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
            const {data, output} = sail(str)
            get(data, 'size').should.be.equal(10.0)
            output.includes(str).should.be.false()
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
            const {data, output} = sail(str)
            get(data, 'size').should.be.equal(10.2)
            output.includes(str).should.be.false()
          })
        })
      })
    })
  })

  describe('special considerations', function () {
    it('in a string with year', function () {
      [
        ['Vela Goya Banzai 2016 5.3 350 P.i', 5.3, '5.3'],
        ['Vendo EZZY WAVE SE 2005 80 € de 5.3', 5.3, '5.3']
      ].forEach(function (str) {
        const {data, output} = sail(str[0])
        get(data, 'size').should.be.equal(str[1])
        output.includes(str[2]).should.be.false()
      })
    })

    it('in a string with price', function () {
      const str = 'Vendo EZZY WAVE SE 2005 80 € de 5.3'
      const {data, output} = sail(str)
      get(data, 'size').should.be.equal(5.3)
      output.includes('5.3').should.be.false()
    })

    it('in a string with model that finish in number', function () {
      [
        ['Vendo Neilpryde H2 7,2 2012 - 175€', 7.2, '7,2'],
        ['Vendo Simmer X-type2 9,0 2008 - 190€', 9.0, '9,0']
      ].forEach(function (str) {
        const {data, output} = sail(str[0])
        get(data, 'size').should.be.equal(str[1])
        output.includes(str[2]).should.be.false()
      })
    })

    it('in a string with brand and model that contains number', function () {
      const str = 'Point7 Ac2 8,3 2012'
      const {data, output} = sail(str)
      get(data, 'size').should.be.equal(8.3)
      output.includes('8,3').should.be.false()
    })

    it('in a string with model that finish in number separated with space', function () {
      const str = 'Vendo Neil Pryde Evo 6 8,6 2015 - 450€'
      const {data, output} = sail(str)
      get(data, 'size').should.be.equal(8.6)
      output.includes('8,6').should.be.false()
    })

    it('in a string with mast dimensions', function () {
      const str = 'Vendo Vela Gaasta Vapor 11 m 2013 y Mastil Gaastra 520 75 '
      const {data, output} = sail(str)
      get(data, 'size').should.be.equal(11)
      output.includes('11').should.be.false()
    })
  })
})
