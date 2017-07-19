'use strict'

const { includes } = require('lodash')

const createScore = require('./create')

const test = item => item.year && item.brand

const getKey = (item, serializeProp, logMissing) => {
  let key = ''

  if (includes(item.category, 'masts') && !item['mast carbon']) {
    logMissing(item, 'mast carbon')
  } else {
    key += serializeProp(key, item['mast carbon'], `C${item['mast carbon']}`)
  }

  key += serializeProp(key, item.brand)
  key += `.${item.condition}`
  key += serializeProp(key, item.year)

  return key
}

module.exports = ({ log, propName, data }) => createScore({ data, test, getKey, propName, log })
