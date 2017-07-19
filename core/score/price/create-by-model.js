'use strict'

const createScore = require('./create')

const test = item => item.year && item.model

const getKey = (item, serializeProp, logMissing) => {
  let key = ''
  key += serializeProp(key, item['mast carbon'], `C${item['mast carbon']}`)
  // we added brand because model implies brand.
  key += serializeProp(key, item.brand)
  key += serializeProp(key, item.model)
  key += `.${item.condition}`
  key += serializeProp(key, item.year)

  return key
}

module.exports = ({ log, propName, data }) => createScore({ data, test, getKey, propName, log })
