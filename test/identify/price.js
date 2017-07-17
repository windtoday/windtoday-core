'use strict'

const price = require('../../core/identify/price')
const should = require('should')
const { get } = require('lodash')

const SYMBOL_VARIATIONS = ['€', ' €', 'e', ' e', 'E', ' E', 'eu', ' eu']

const SEPARATOR_VARIATIONS = [' ', '.', ',', ';', ')']

describe('identify » price', function () {
  it('not detect', function () {
    ;['', 'Vendo material (7 ene 16)'].forEach(function (str) {
      const { data } = price(str)
      should(get(data, 'price')).be.undefined()
    })
  })

  describe('detect', function () {
    describe('zero decimal', function () {
      describe('symbol at end', function () {
        const quantity = 135
        ;['e', 'E', '€'].forEach(function (symbol) {
          ;[
            `${quantity}${symbol}`,
            `${quantity} ${symbol}`,
            ` ${quantity} ${symbol}`,
            `${quantity} ${symbol} `,
            ` ${quantity} ${symbol} `
          ].forEach(function (str) {
            it(`${str} → ${quantity}`, function () {
              const { data, output } = price(str)
              should(get(data, 'price')).be.equal(quantity)
              should(output.includes(str)).be.false()
            })
          })
        })
      })

      describe('symbol at begin', function () {
        const quantity = 135
        ;['€'].forEach(function (symbol) {
          const str = `${symbol}${quantity}`
          it(`${str} → ${quantity}`, function () {
            const { data, output } = price(str)
            should(get(data, 'price')).be.equal(quantity)
            should(output.includes(str)).be.false()
          })
        })
      })
    })

    describe('one decimal', function () {
      const expected = 1100
      ;['1.100', '1,100'].forEach(function (quantity) {
        ;['e', 'E', '€'].forEach(function (symbol) {
          ;[
            `${quantity}${symbol}`,
            `${quantity} ${symbol}`,
            ` ${quantity} ${symbol}`,
            `${quantity} ${symbol} `,
            ` ${quantity} ${symbol} `
          ].forEach(function (str) {
            it(`${str} → ${expected}`, function () {
              const { data, output } = price(str)
              should(get(data, 'price')).be.equal(expected)
              should(output.includes(str)).be.false()
            })
          })
        })
      })
    })

    describe('variations', function () {
      const expected = 100
      SYMBOL_VARIATIONS.forEach(function (symbol) {
        SEPARATOR_VARIATIONS.forEach(function (separator) {
          it(`${expected}${symbol}${separator} → ${expected}`, function () {
            const str = `Vendo botavara de aluminio marca Aeron. Medidas de 200-250. Incluye driza y cabos de arnes de 28". Precio ${expected}${symbol}${separator}GI incluidos`

            const { data, output } = price(str)
            should(get(data, 'price')).be.equal(expected)
            should(output).be.equal(
              output.replace(`${expected}${symbol}${separator}`, '')
            )
          })
        })
      })
    })

    describe('word', function () {
      const expected = 1100
      ;['1.100', '1,100'].forEach(function (quantity) {
        ;['euros', 'Euros'].forEach(function (symbol) {
          ;[
            `${quantity}${symbol}`,
            `${quantity} ${symbol}`,
            ` ${quantity} ${symbol}`,
            `${quantity} ${symbol} `,
            ` ${quantity} ${symbol} `
          ].forEach(function (str) {
            it(`${str} → ${expected}`, function () {
              const { data, output } = price(str)
              should(get(data, 'price')).be.equal(expected)
              should(output.includes(str)).be.false()
            })
          })
        })
      })
    })
  })
})
