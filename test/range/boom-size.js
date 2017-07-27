'use strict'

const should = require('should')

const boomSizeRange = require('../../core/range/boom-size')

const TESTS = [
  { inputs: [90], expected: '<100cm' },
  { inputs: [100, 149], expected: '100cm to 150cm' },
  { inputs: [150, 199], expected: '150cm to 200cm' },
  { inputs: [200], expected: '>200cm' }
]

describe('core » range » boom size', function () {
  TESTS.forEach(({ inputs, expected }) => {
    describe(expected, function () {
      inputs.forEach(input => {
        it(`${input}`, function () {
          should(boomSizeRange(input)).be.equal(expected)
        })
      })
    })
  })
})
