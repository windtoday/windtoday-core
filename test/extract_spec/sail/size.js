'use strict'

var should = require('should')
var lodash = require('lodash')

module.exports = function (extract) {
  describe('size', function () {
    it('not detection', function () {
      var size = lodash.get(extract.sail(''), 'sailSize')
      should(size).be.undefined()
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
        var size = lodash.get(extract.sail(sailSize), 'sailSize')
        size.should.be.equal('7.0')
      })
    })

    it('detect single number', function () {
      ;[
        '7m',
        '7 m'
      ].forEach(function (sailSize) {
        var size = lodash.get(extract.sail(sailSize), 'sailSize')
        size.should.be.equal('7.0')
      })
    })

    it('detect', function () {
      var size = lodash.get(extract.sail('Vendo Neilpryde H2 7,2 2012 - 175€'), 'sailSize')
      size.should.be.equal('7.2')

      var size = lodash.get(extract.sail('"Vendo Neil Pryde VX2 8,4 1999 - 75€"'), 'sailSize')
      size.should.be.equal('8.4')

      var size = lodash.get(extract.sail('Vendo Neil Pryde Evo 6 8,6 2015 - 450€'), 'sailSize')
      size.should.be.equal('8.6')
    })
  })
}
