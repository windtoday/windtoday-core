'use strict'

const should = require('should')

const createGetPriceByModel = require('../../core/score/create-get-price-by-model')
const createGetPriceByCategory = require('../../core/score/create-get-price-by-category')
const createGetPriceByBrand = require('../../core/score/create-get-price-by-brand')
const createGetPrice = require('../../core/score')
const data = require('../data.json')

const log = {
  warn: () => {}
}

describe('core » score » get price', function () {
  it('by model', function () {
    const propName = 'price'
    const getPriceByModel = createGetPriceByModel({ log, propName, data })
    const { aggregate } = getPriceByModel
    should(aggregate['masts.north.new.2017']).be.undefined()
    should(aggregate['masts.c95.new.2017']).be.undefined()
  })

  it('by brand', function () {
    const propName = 'price'
    const getPriceByBrand = createGetPriceByBrand({ log, propName, data })
    const { aggregate } = getPriceByBrand
    should(aggregate['sails.gaastra.pure.used.2012']).be.undefined()
    should(aggregate['masts.c95.new.2017']).be.undefined()
  })

  it('by category', function () {
    const propName = 'price'
    const getPriceByCategory = createGetPriceByCategory({ log, propName, data })
    const { aggregate } = getPriceByCategory
    should(aggregate['sails.gaastra.pure.used.2012']).be.undefined()
    should(aggregate['masts.north.new.2017']).be.undefined()
  })

  it('ponderate price', function () {
    const propName = 'price'
    const getPrice = createGetPrice({ log, propName, data })
    const result = getPrice(data[0])
  })
})
