'use strict'

const should = require('should')
const { size } = require('lodash')

const aggregateProp = require('../../core/util/aggregate-prop')

const data = require('../data.json')

describe('core » util » aggregate prop', function () {
  it('get aggregate of a numeric prop', function () {
    const test = item => item.year && item.price && size(item.category) === 1
    const getKey = item => `${item.year}.${item.condition}.${item.category}`
    const propName = 'price'
    const aggregate = aggregateProp({ data, test, getKey, propName })

    const key = '2017.used.sails'
    const score = aggregate[key]
    should(score).be.eql({ total: 9, min: 290, max: 495, avg: 313, p95: 495 })
  })
})
