'use strict'

const { includes } = require('lodash')

const createGetScore = require('./create-get-score')

const test = item => item.year

const getKey = (item, serializeProp, logMissing) => {
  let key = ''

  if (includes(item.category, 'masts') && !item['mast carbon']) {
    logMissing(item, 'mast carbon')
  } else {
    key += serializeProp(key, item['mast carbon'], `C${item['mast carbon']}`)
  }

  key += `.${item.condition}`
  key += serializeProp(key, item.year)

  return key
}

module.exports = ({ log, propName, data }) =>
  createGetScore({ data, test, getKey, propName, log })