'use strict'

const should = require('should')
const {size} = require('lodash')

const createGetScore = require('../../core/score/create-get-score')
const aggregateProp = require('../../core/score/aggregate-prop')
const data = require('./data.json')

describe('score » create get score', function () {
  it('calculate score', function () {
    const test = item => item.price && size(item.category) === 1 && item.year
    const getKey = item => `${item.year}.${item.condition}.${item.category}`
    const propName = 'price'

    const aggregate = aggregateProp({data, test, getKey, propName})
    const getScore = createGetScore({aggregate, test, getKey, propName})

    const score = getScore(data[1])

    should(score).be.equal(0.61)
  })
})
