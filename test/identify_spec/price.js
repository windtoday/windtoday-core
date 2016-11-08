'use strict'

const price = require('../../core/identify/price')
const should = require('should')
const {get} = require('lodash')

describe('identify » price', function () {
  it('not detect', function () {
    [
      '',
      'Vendo material (7 ene 16)'
    ].forEach(function (str) {
      const {data} = price(str)
      should(get(data, 'price')).be.undefined()
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
              const {data, output} = price(str)
              should(get(data, 'price')).be.equal(quantity)
              output.includes(str).should.be.false()
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
            const {data, output} = price(str)
            should(get(data, 'price')).be.equal(quantity)
            output.includes(str).should.be.false()
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
              const {data, output} = price(str)
              should(get(data, 'price')).be.equal(expected)
              output.includes(str).should.be.false()
            })
          })
        })
      })
    })
  })
})
