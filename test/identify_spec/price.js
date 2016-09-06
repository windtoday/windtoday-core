'use strict'

const should = require('should')

module.exports = function (identify) {
  describe('price', function () {
    it('not detect', function () {
      should(identify.price('')).be.undefined()
      should(identify.price('Vendo material (7 ene 16)')).be.undefined()
    })

    describe('detect', function () {
      var quantity = 135
      var symbols = ['e', 'E', '€']

      symbols.forEach(function (symbol) {
        it(`with '${symbol} symbol'`, function () {
          [
            String(quantity + symbol),
            String(quantity + ' ' + symbol),
            String(' ' + quantity + ' ' + symbol),
            String(quantity + ' ' + symbol + ' '),
            String(' ' + quantity + ' ' + symbol + ' ')
          ].forEach(function (price) {
            identify.price(price).should.be.equal(135)
          })
        })
      })
    })
  })
}
