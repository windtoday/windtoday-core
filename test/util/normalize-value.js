'use strict'

const should = require('should')

const normalizeValue = require('../../core/util/normalize-value')

describe('core » util » normalize value', function () {
  it('normalize correctly', function () {
    const value = 500
    const min = 0
    const max = 1000

    const normalizedValue = normalizeValue(value, [
      { value: min, norm: 1 },
      { value: max, norm: 0 }
    ])

    should(normalizedValue).be.equal(0.5)
  })
})
