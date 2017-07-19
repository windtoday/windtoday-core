'use strict'

const should = require('should')

const createGetScoreByCategory = require('../../../core/score/price/create-by-category')
const createGetScoreByModel = require('../../../core/score/price/create-by-model')
const createGetScoreByBrand = require('../../../core/score/price/create-by-brand')
const data = require('../../data.json')

const log = {
  warn: () => {}
}

describe('core » score', function () {
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
})
