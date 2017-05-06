'use strict'

const should = require('should')
const {size} = require('lodash')

const aggregateProp = require('../../../core/score/aggregate-prop')
const data = require('./data.json')

describe('score » aggregate prop', function () {
  it('get aggregate of a numeric prop', function () {
    const test = item => item.price && size(item.category) === 1 && item.year
    const getKey = item => `${item.year}.${item.condition}.${item.category}`
    const propName = 'price'

    const aggregate = aggregateProp({data, test, getKey, propName})
    const aggregateKey = '2017.new.masts'

    should(aggregate[aggregateKey]).be.eql({
      min: 159,
      max: 1080,
      avg: 487
    })
  })
})
