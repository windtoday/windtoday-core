'use strict'

const should = require('should')
const { get } = require('lodash')

module.exports = function (identify) {
  describe('brand', function () {
    it('not detect', function () {
      const brand = get(identify.board(''), 'brand')
      should(brand).be.undefined()
    })

    it('detect', function () {
      [
        'starboard futura'
      ].forEach(function (title) {
        const brand = get(identify.board(title), 'brand')
        brand.should.be.equal('Starboard')
      })
    })
  })
}
