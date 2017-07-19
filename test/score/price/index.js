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
      should(aggregate['masts.north.new.2017']).be.undefined()
      should(aggregate['masts.c95.new.2017']).be.undefined()
    })

    it('by brand', function () {
      const propName = 'price'
      const getPriceByBrand = createGetScoreByBrand({ log, propName, data })
      const { aggregate } = getPriceByBrand
      should(aggregate['sails.gaastra.pure.used.2012']).be.undefined()
      should(aggregate['masts.c95.new.2017']).be.undefined()
    })

    it('by category', function () {
      const propName = 'price'
      const getPriceByCategory = createGetScoreByCategory({ log, propName, data })
      const { aggregate } = getPriceByCategory
      should(aggregate['sails.gaastra.pure.used.2012']).be.undefined()
      should(aggregate['masts.north.new.2017']).be.undefined()
    })

    it('all', function () {
      const propName = 'price'
      const getScore = createGetSscore({ log, propName, data })
      should(getScore(item)).be.eql({
        byCategory: 0.6378132118451025,
        byBrand: 1,
        byModel: 1
      })
    })
  })
})
