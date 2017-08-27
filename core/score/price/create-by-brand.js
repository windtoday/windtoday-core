'use strict'

const createScore = require('./create')

const test = item => item.brand && item.year

const getKey = (item, serializeProp, logMissing) => {
  let key = ''
  key += serializeProp(key, item.brand)
  key += serializeProp(key, item.year)
  return key
}

module.exports = ({ log, propName, data }) =>
  createScore({ data, test, getKey, propName, log })
