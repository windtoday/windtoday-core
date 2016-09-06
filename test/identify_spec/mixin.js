'use strict'

const should = require('should')

module.exports = function (identify) {
  describe('mixin', function () {
    it('sail detection', function () {
      const str = 'vendo ga-sails vapor 11m 2015'
      identify.mixin(str).should.be.eql({
        size: 11,
        brand: 'Gaastra',
        model: 'Vapor'
      })
    })

    it('board', function () {
      const str = 'vendo tabla f2 fx100 x 132 litros rebajada a 300€'
      identify.mixin(str).should.be.eql({
        brand: 'F2',
        litres: 100
      })
    })
  })
}
