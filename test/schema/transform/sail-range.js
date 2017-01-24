'use strict'

const sailRange = require('../../../core/schema/transform/sail-range')
const should = require('should')
const {range} = require('lodash')

describe('schema » transform » sail range', function () {
  describe('< 4.6m²', function () {
    range(0, 6).forEach(function (decimal) {
      const input = Number(`4.${decimal}`)
      it(input.toString(), function () {
        const output = sailRange(input)
        should(output).be.equal('< 4.6m²')
      })
    })
  })

  describe('4.6m² to 4.9m²', function () {
    range(6, 10).forEach(function (decimal) {
      const input = Number(`4.${decimal}`)
      it(input.toString(), function () {
        const output = sailRange(input)
        should(output).be.equal('4.6m² to 4.9m²')
      })
    })
  })

  describe('5.0m² to 5.9m²', function () {
    range(0, 10).forEach(function (decimal) {
      const input = Number(`5.${decimal}`)
      it(input.toString(), function () {
        const output = sailRange(input)
        should(output).be.equal('5.0m² to 5.9m²')
      })
    })
  })

  describe('6.0m² to 6.9m²', function () {
    range(0, 10).forEach(function (decimal) {
      const input = Number(`6.${decimal}`)
      it(input.toString(), function () {
        const output = sailRange(input)
        should(output).be.equal('6.0m² to 6.9m²')
      })
    })
  })

  describe('7.0m² to 7.9m²', function () {
    range(0, 10).forEach(function (decimal) {
      const input = Number(`7.${decimal}`)
      it(input.toString(), function () {
        const output = sailRange(input)
        should(output).be.equal('7.0m² to 7.9m²')
      })
    })
  })

  describe('8.0m² to 9.0m²', function () {
    range(0, 10).forEach(function (decimal) {
      const input = Number(`8.${decimal}`)
      it(input.toString(), function () {
        const output = sailRange(input)
        should(output).be.equal('8.0m² to 9.0m²')
      })

      it('9.0', function () {
        const output = sailRange(9.0)
        should(output).be.equal('8.0m² to 9.0m²')
      })
    })
  })

  describe('> 9.0m²', function () {
    range(1, 9).forEach(function (decimal) {
      const input = Number(`9.${decimal}`)
      it(input.toString(), function () {
        const output = sailRange(input)
        should(output).be.equal('> 9.0m²')
      })
    })
  })
})
