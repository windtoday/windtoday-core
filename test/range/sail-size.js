'use strict'

const should = require('should')

const sailSizeRange = require('../../core/range/sail-size')

const TESTS = [
  {inputs: [2.9], expected: '<3m'},
  {inputs: [3, 3.9], expected: '3m to 4m'},
  {inputs: [4, 4.9], expected: '4m to 5m'},
  {inputs: [5, 5.9], expected: '5m to 6m'},
  {inputs: [6, 6.9], expected: '6m to 7m'},
  {inputs: [7, 7.9], expected: '7m to 8m'},
  {inputs: [8, 8.9], expected: '8m to 9m'},
  {inputs: [9], expected: '>9m'}
]

describe('core » range » sail size', function () {
  TESTS.forEach(({inputs, expected}) => {
    describe(expected, function () {
      inputs.forEach(input => {
        it(`${input}`, function () {
          should(sailSizeRange(input)).be.equal(expected)
        })
      })
    })
  })
})
