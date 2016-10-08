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
    describe('zero decimal', function () {
      var quantity = 135
      var symbols = ['e', 'E', '€']

      symbols.forEach(function (symbol) {
        it(`${quantity}${symbol} → ${quantity}`, function () {
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

    describe('one decimal', function () {
      var expected = 1100
      var quantities = ['1.100', '1,100']
      var symbols = ['e', 'E', '€']

      quantities.forEach(function (quantity) {
        symbols.forEach(function (symbol) {
          it(`${quantity}${symbol} → ${expected}`, function () {
            [
              `${quantity}${symbol}`,
              `${quantity} ${symbol}`,
              ` ${quantity} ${symbol}`,
              `${quantity} ${symbol} `,
              ` ${quantity} ${symbol} `
            ].forEach(function (str) {
              price(str).should.be.equal(expected)
            })
          })
        })
      })
    })
  })
})
