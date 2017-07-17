'use strict'

const should = require('should')

const createPriceScoreByModel = require('../../core/score/by-model')
const createPriceScoreByBrand = require('../../core/score/by-brand')
const data = require('../data.json')

const log = {
  warn: () => {}
}

describe('score » get specific', function () {
  it('by model', function () {
    const propName = 'price'
    const getPriceScore = createPriceScoreByModel({log, propName, data})
    const {aggregate} = getPriceScore
  })

  it('by brand', function () {
    const propName = 'price'
    const getPriceScore = createPriceScoreByBrand({log, propName, data})
    const {aggregate} = getPriceScore
  })
})
