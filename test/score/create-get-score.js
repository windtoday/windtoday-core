'use strict'

const should = require('should')
const {size} = require('lodash')

const createGetScore = require('../../core/score/create-get-score')
const data = require('../data.json')

describe('score » create get score', function () {
  const test = item => item.price && size(item.category) === 1 && item.year
  const getKey = item => `.${item.year}.${item.condition}`
  const propName = 'price'
  const getScore = createGetScore({data, test, getKey, propName})

  it('expose aggregate', function () {
    const {aggregate} = getScore
    const key = 'masts.2017.new'
    should(aggregate[key]).be.an.Object()
  })

  it('calculate score from an item', function () {
    const score = getScore(data[1])
    should(score).be.equal(5)
  })
})
