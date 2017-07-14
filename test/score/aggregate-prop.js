'use strict'

const should = require('should')
const {size} = require('lodash')

const aggregateProp = require('../../core/score/aggregate-prop')
const getKey = require('../../core/score/get-key')({
  warn: () => {}
})

const data = require('../data.json')

describe('score » aggregate prop', function () {
  it('get aggregate of a numeric prop', function () {
    const test = item => item.price && size(item.category) === 1
    const propName = 'price'
    const aggregate = aggregateProp({data, test, getKey, propName})

    const key = 'masts.c100.new.2017'
    const score = aggregate[key]

    should(score).be.eql({
      total: 19,
      min: 575,
      max: 769,
      avg: 643,
      p95: 769
    })
  })
})
