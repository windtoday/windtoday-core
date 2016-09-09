'use strict'

const should = require('should')
const price = require('../../core/identify/price')

describe('identify » price', function () {
  it('not detect', function () {
    [
      '',
      'Vendo material (7 ene 16)'
    ].forEach(function (str) {
      should(price(str)).be.undefined()
    })
  })

  describe('detect', function () {
    var quantity = 135
    var symbols = ['e', 'E', '€']

    symbols.forEach(function (symbol) {
      it(`with '${symbol} symbol'`, function () {
        [
          `${quantity}${symbol}`,
          `${quantity} ${symbol}`,
          ` ${quantity} ${symbol}`,
          `${quantity} ${symbol} `,
          ` ${quantity} ${symbol} `
        ].forEach(function (str) {
          price(str).should.be.equal(135)
        })
      })
    })
  })
})
