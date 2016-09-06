'use strict'

const should = require('should')

module.exports = function (identify) {
  describe('mixin', function () {
    it('sail', function () {
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
        litres: 132
      })
    })

    it('sail brand but board model', function () {
      const str = 'Naish Hardline'
      identify.mixin(str).should.be.eql({
        brand: 'Naish',
        model: 'Hardline'
      })
    })

    it('sail brand but board model', function () {
      const str = 'Se vende Bic Techno 283 152 litros'
      identify.mixin(str).should.be.eql({
        brand: 'Bic',
        litres: 152,
        model: 'Techno'
      })
    })
  })
}
