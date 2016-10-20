'use strict'

const { lowerCase } = require('lodash')

const categories = {
  sails: 'sails',
  boards: 'boards',
  fins: 'fins',
  booms: 'booms',
  masts: 'masts',
  others: 'others'
}

function category (str) {
  str = lowerCase(str)
  const category = categories[str]
  if (category) return category
  return categories.others
}
