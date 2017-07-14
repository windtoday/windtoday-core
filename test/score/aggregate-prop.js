'use strict'

const should = require('should')
const {first, size} = require('lodash')

const aggregateProp = require('../../core/score/aggregate-prop')
const getKey = require('../../core/score/get-key')({
  warn: () => {}
})

const data = require('../data.json')

describe('score » aggregate prop', function () {
  it('get aggregate of a numeric prop', function () {
    const test = item => item.price && size(item.category) === 1

    const propName = 'priceScore'
    const aggregate = aggregateProp({data, test, getKey, propName})

    const item = first(data)
    const key = getKey(item)
    const score = aggregate[key]

    should(score).be.eql({
      min: 185, max: 1120, avg: 472, p95: 1120
    })
  })
})
