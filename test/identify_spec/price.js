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

    describe('specific cases', function () {
      it('followed with space', function () {
        const str = 'Vendo botavara de aluminio marca Aeron. Medidas de 200-250. Incluye driza y cabos de arnes de 28". Precio 100€ GI incluidos'
        const {data, output} = price(str)

        should(get(data, 'price')).be.equal(100)
        output.should.be.equal('Vendo botavara de aluminio marca Aeron. Medidas de 200-250. Incluye driza y cabos de arnes de 28". Precio GI incluidos')
      })

      it('followed with dot', function () {
        const str = 'Vendo botavara de aluminio marca Aeron. Medidas de 200-250. Incluye driza y cabos de arnes de 28". Precio 100€.'
        const {data, output} = price(str)

        should(get(data, 'price')).be.equal(100)
        output.should.be.equal('Vendo botavara de aluminio marca Aeron. Medidas de 200-250. Incluye driza y cabos de arnes de 28". Precio ')
      })

      it('followed by comma', function () {
        const str = 'Vendo Gaastra IQ 4.7 2012, en buen estado por 60€, está en Barcelona, se puede enviar.'
        const {data, output} = price(str)

        should(get(data, 'price')).be.equal(60)
        output.should.be.equal('Vendo Gaastra IQ 4.7 2012, en buen estado por  está en Barcelona, se puede enviar.')
      })

      it('followed by dot comma', function () {
        const str = 'Vendo Gaastra IQ 4.7 2012, en buen estado por 60€; está en Barcelona, se puede enviar.'
        const {data, output} = price(str)

        should(get(data, 'price')).be.equal(60)
        output.should.be.equal('Vendo Gaastra IQ 4.7 2012, en buen estado por  está en Barcelona, se puede enviar.')
      })
    })
  })
})
