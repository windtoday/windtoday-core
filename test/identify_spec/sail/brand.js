'use strict'

const should = require('should')
const { get } = require('lodash')

module.exports = function (identify) {
  describe('brand', function () {
    it('not detect', function () {
      const brand = get(identify.sail(''), 'brand')
      should(brand).be.undefined()
    })

    it('detect', function () {
      [
        'loftsails racing blade',
        'loft sails racingblade',
        'loft racing blade'
      ].forEach(function (title) {
        const brand = get(identify.sail(title), 'brand')
        brand.should.be.equal('Loft')
      })
    })
  })
}