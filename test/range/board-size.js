'use strict'

const should = require('should')

const boardSizeRange = require('../../core/range/board-size')

const TESTS = [
  {inputs: [69], expected: '<70l'},
  {inputs: [70, 79], expected: '70l to 80l'},
  {inputs: [80, 89], expected: '80l to 90l'},
  {inputs: [90, 99], expected: '90l to 100l'},
  {inputs: [100, 109], expected: '100l to 110l'},
  {inputs: [110, 119], expected: '110l to 120l'},
  {inputs: [120, 129], expected: '120l to 130l'},
  {inputs: [130], expected: '>130l'}
]

describe('core » range » board size', function () {
  TESTS.forEach(({inputs, expected}) => {
    describe(expected, function () {
      inputs.forEach(input => {
        it(`${input}`, function () {
          should(boardSizeRange(input)).be.equal(expected)
        })
      })
    })
  })
})
