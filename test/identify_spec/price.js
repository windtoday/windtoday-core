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
      describe('symbol at end', function () {
        const quantity = 135
        const symbols = ['e', 'E', '€']

        symbols.forEach(function (symbol) {
          it(`${quantity}${symbol} → ${quantity}`, function () {
            [
              `${quantity}${symbol}`,
              `${quantity} ${symbol}`,
              ` ${quantity} ${symbol}`,
              `${quantity} ${symbol} `,
              ` ${quantity} ${symbol} `
            ].forEach(function (str) {
              price(str).should.be.equal(quantity)
            })
          })
        })
      })

      describe('symbol at begin', function () {
        const quantity = 135
        const symbols = ['€']

        symbols.forEach(function (symbol) {
          const str = `${symbol}${quantity}`
          it(`${str} → ${quantity}`, function () {
            price(str).should.be.equal(quantity)
          })
        })
      })
    })

    describe('one decimal', function () {
      const expected = 1100
      const quantities = ['1.100', '1,100']
      const symbols = ['e', 'E', '€']

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
