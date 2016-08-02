'use strict'

var should = require('should')
var lodash = require('lodash')

module.exports = function (extract) {
  describe('size', function () {
    it('not detection', function () {
      var size = lodash.get(extract.sail(''), 'size')
      should(size).be.undefined()
    })

    it('detect', function () {
      ;[
        '7 0',
        '7.0',
        '7,0',
        "7'0",
        '7.0m',
        '7,0m',
        "7'0m"
      ].forEach(function (sailSize) {
        var size = lodash.get(extract.sail(sailSize), 'size')
        size.should.be.equal('7.0')
      })
    })
  })
}
