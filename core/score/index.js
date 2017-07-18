'use strict'

const createGetPriceByBrand = require('./create-get-price-by-brand')
const createGetPriceByModel = require('./create-get-price-by-model')
const createGetPriceByCategory = require('./create-get-price-by-category')

const {round} = require('lodash')

module.exports = ({ log, propName, data }) => {
  const getPriceByCategory = createGetPriceByCategory({log, propName, data})
  const getPriceByBrand = createGetPriceByBrand({log, propName, data})
  const getPriceByModel = createGetPriceByModel({log, propName, data})

  const getPrice = doc => round(
    getPriceByCategory(doc) * 0.3 +
    getPriceByBrand(doc) * 0.3 +
    getPriceByModel(doc) * 0.4
  )

  return getPrice
}
