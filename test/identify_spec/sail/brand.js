'use strict'

var should = require('should')
var lodash = require('lodash')

module.exports = function (extract) {
  describe('brand', function () {
    it('not detect', function () {
      var brand = lodash.get(extract.sail(''), 'brand')
      should(brand).be.undefined()
    })

    it('detect', function () {
      [
        'loftsails racing blade',
        'loft sails racingblade',
        'loft racing blade'
      ].forEach(function (title) {
        var brand = lodash.get(extract.sail(title), 'brand')
        brand.should.be.equal('Loft')
      })
    })
  })
}
