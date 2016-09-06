'use strict'

const should = require('should')
const { get } = require('lodash')

module.exports = function (identify) {
  describe('size', function () {
    it('not detection', function () {
      [
        ''
      ].forEach(function (str) {
        const size = get(identify.sail(str), 'size')
        should(size).be.undefined()
      })
    })

    it('detect separator variatons', function () {
      ;[
        ' 7 0',
        ' 7.0',
        ' 7,0',
        " 7'0",
        ' 7.0m',
        ' 7,0m',
        " 7'0m"
      ].forEach(function (sailSize) {
        const size = get(identify.sail(sailSize), 'size')
        size.should.be.equal(7.0)
      })
    })

    it('detect single number', function () {
      ;[
        '7m',
        '7 m'
      ].forEach(function (sailSize) {
        const size = get(identify.sail(sailSize), 'size')
        size.should.be.equal(7.0)
      })
    })

    describe('detect', function () {
      it('in a string with model that finish in number', function () {
        const size = get(identify.sail('Vendo Neilpryde H2 7,2 2012 - 175€'), 'size')
        size.should.be.equal(7.2)
      })

      it('in a string with model that finish in number separated with space', function () {
        const size = get(identify.sail('Vendo Neil Pryde Evo 6 8,6 2015 - 450€'), 'size')
        size.should.be.equal(8.6)
      })

      it('in a string with mast dimensions', function () {
        const size = get(identify.sail('Vendo Vela Gaasta Vapor 11 m 2013 y Mastil Gaastra 520 75 '), 'size')
        size.should.be.equal(11)
      })
    })
  })
}
