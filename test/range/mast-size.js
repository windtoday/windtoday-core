'use strict'

const should = require('should')

const mastSizeRange = require('../../core/range/mast-size')

const TESTS = [
  { inputs: [369], expected: '<370cm' },
  { inputs: [370, 399], expected: '370cm to 400cm' },
  { inputs: [400, 429], expected: '400cm to 430cm' },
  { inputs: [430, 459], expected: '430cm to 460cm' },
  { inputs: [460, 489], expected: '460cm to 490cm' },
  { inputs: [490, 519], expected: '490cm to 520cm' },
  { inputs: [520], expected: '>520cm' }
]

describe('core » range » mast size', function () {
  TESTS.forEach(({ inputs, expected }) => {
    describe(expected, function () {
      inputs.forEach(input => {
        it(`${input}`, function () {
          should(mastSizeRange(input)).be.equal(expected)
        })
      })
    })
  })
})
