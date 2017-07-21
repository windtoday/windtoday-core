'use strict'

const {isNil, every} = require('lodash')

const REQUIRED = [
  'price',
  'brand',
  'model',
  'category',
  'year',
  'condition',
  'image'
]

const getConditionalScore = prop => !isNil(prop) ? 0.1 : 0

const CATEGORY_SCORE = {
  sails: item => 0.9 + getConditionalScore(item['sail size']),
  boards: item => 0.9 + getConditionalScore(item['board size']),
  masts: item => {
    const carbon = getConditionalScore(item['mast carbon'])
    const type = getConditionalScore(item['mast type'])
    const size = getConditionalScore(item['mast size'])
    return 0.7 + carbon + type + size
  },
  fins: item => {
    const size = getConditionalScore(item['fin size'])
    const type = getConditionalScore(item['fin type'])
    return 0.8 + type + size
  },
  booms: item => {
    const size = getConditionalScore(item['boom size'])
    const type = getConditionalScore(item['boom type'])
    return 0.8 + type + size
  },
  others: item => 1
}

module.exports = item => {
  const areRequiredPresent = every(REQUIRED, prop => !isNil(item[prop]))
  if (!areRequiredPresent) return 0
  const { category } = item
  return CATEGORY_SCORE[category](item)
}
