'use strict'

const {filter} = require('lodash')

const MAX_PRICE_BASELINE = 500

function isOffer (item) {
  // TODO: Too generic, determinate a price per each category
  return item.price < MAX_PRICE_BASELINE
}

function createShare (fn) {
  function share (docs, cb) {
    const offerDocs = filter(docs, isOffer)
    return fn(offerDocs, cb)
  }

  return share
}
module.exports = createShare
