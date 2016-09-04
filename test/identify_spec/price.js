'use strict'

const should = require('should')

module.exports = function (identify) {
  describe('price', function () {
    it('not detect', function () {
      should(identify.price('')).be.undefined()
    })

    it('detect', function () {
      ;['80e', '80 e', ' 80 e', '80 e ', ' 80 e '].forEach(function (price) {
        identify.price(price).should.be.equal('80')
      })

      ;['150E', '150 E', ' 150 E', '150 E ', ' 150 E '].forEach(function (price) {
        identify.price(price).should.be.equal('150')
      })

      ;['200€', '200 €', ' 200 €', ' 200 € ', '200 € '].forEach(function (price) {
        identify.price(price).should.be.equal('200')
      })
    })
  })
}
