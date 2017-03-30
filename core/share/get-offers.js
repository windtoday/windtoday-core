'use strict'

const {filter} = require('lodash')

const MAX_PRICE_BASELINE = 500

function isOffer (item) {
  return item.price < MAX_PRICE_BASELINE
}

function getOffers (items) {
  return filter(items, isOffer)
}

module.exports = getOffers
