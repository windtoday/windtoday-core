'use strict'

const should = require('should')

const mastCarbon = require('../../core/range/mast-carbon')

const TESTS = [
  {inputs: [0, 9], expected: 'C0 to C10'},
  {inputs: [10, 19], expected: 'C10 to C20'},
  {inputs: [20, 29], expected: 'C20 to C30'},
  {inputs: [30, 39], expected: 'C30 to C40'},
  {inputs: [40, 49], expected: 'C40 to C50'},
  {inputs: [50, 59], expected: 'C50 to C60'},
  {inputs: [60, 69], expected: 'C60 to C70'},
  {inputs: [70, 79], expected: 'C70 to C80'},
  {inputs: [80, 89], expected: 'C80 to C90'},
  {inputs: [90, 100], expected: 'C90 to C100'}
]

describe('core » range » board size', function () {
  TESTS.forEach(({inputs, expected}) => {
    describe(expected, function () {
      inputs.forEach(input => {
        it(`${input}`, function () {
          should(mastCarbon(input)).be.equal(expected)
        })
      })
    })
  })
})
