'use strict'

const { includes, toLower } = require('lodash')
const isValidCondition = require('./validate/condition')

const isParticularSeller = seller => includes(['particular', 'used'], seller)

function getCondition (item) {
  const condition = toLower(item.condition)
  if (isValidCondition(condition)) return condition

  const seller = toLower(item.seller)
  return isParticularSeller(seller) ? 'used' : 'new'
}

module.exports = getCondition
