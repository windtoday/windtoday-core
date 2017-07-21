'use strict'

const should = require('should')
const {find} = require('lodash')

const createGetScoreByCategory = require('../../../core/score/price/create-by-category')
const createGetScoreByModel = require('../../../core/score/price/create-by-model')
const createGetScoreByBrand = require('../../../core/score/price/create-by-brand')
const createGetSscore = require('../../../core/score/price')
const data = require('../../data.json')

const log = { warn: () => {}, info: () => {}, debug: () => {} }
const item = find(data, item => item['sail size'] === 7)

describe('core » score', function () {
  it('when total of items is one, value is 1', function () {
    const propName = 'price'
    const getPriceByModel = createGetScoreByModel({ log, propName, data })
    should(getPriceByModel(item)).be.equal(1)
  })

  describe('group', function () {
    it('by model', function () {
      const propName = 'price'
      const getPriceByModel = createGetScoreByModel({ log, propName, data })
      const { aggregate } = getPriceByModel
      should(aggregate['masts.new.north.2017']).be.undefined()
      should(aggregate['masts.used.c90 to c100']).be.undefined()
      should(aggregate['sails.new.north.warp.2017.5m to 6m']).be.an.Object()
    })

    it('by brand', function () {
      const propName = 'price'
      const getPriceByBrand = createGetScoreByBrand({ log, propName, data })
      const { aggregate } = getPriceByBrand
      should(aggregate['sails.new.north.warp.2017.5m to 6m']).be.undefined()
      should(aggregate['masts.used.c90 to c100']).be.undefined()
      should(aggregate['masts.new.north.2017']).be.an.Object()
    })

    it('by category', function () {
      const propName = 'price'
      const getPriceByCategory = createGetScoreByCategory({ log, propName, data })
      const { aggregate } = getPriceByCategory
      should(aggregate['sails.new.north.warp.2017.5m to 6m']).be.undefined()
      should(aggregate['masts.new.north.2017']).be.undefined()
      should(aggregate['masts.used.c90 to c100']).be.an.Object()
    })

    it('all', function () {
      const propName = 'price'
      const getScore = createGetSscore({ log, propName, data })
      const score = getScore(item)
      should(score).be.eql({
        score: 97,
        scoreDetail: {
          byCategory: 88,
          byBrand: 100,
          byModel: 100,
          byYear: 100
        }
      })
    })
  })
})
