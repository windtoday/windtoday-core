'use strict'

var should = require('should')
var lodash = require('lodash')

module.exports = function (extract) {
  describe('sails', function () {
    it('brand with model', function () {
      [
        'loftsails racing blade',
        'loft sails racingblade',
        'loft racing blade'
      ].forEach(function (title) {
        extract.sail(title).should.be.eql({
          brand: 'Loft Sails',
          model: 'Racing Blade'
        })
      })
    })

    it('size', function () {
      var size = lodash.get(extract.sail(''), 'size')
      should(size).be.undefined()
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
