'use strict'

const {includes, pick, toLower} = require('lodash')

module.exports = log => item => {
  let key = `${item.category}`

  if (item['mast carbon']) key += `.C${item['mast carbon']}`

  if (includes(item.category, 'masts') && !item['mast carbon']) {
    log.warn('missing mast carbon %J', pick(item, [
      'title',
      'provider',
      'objectID',
      'link'
    ]))
  }

  if (item['boom type']) key += `.${item['boom type']}`

  if (item.model) key += `.${item.brand}.${item.model}`
  key += `.${item.condition}`
  if (item.year) key += `.${item.year}`

  return toLower(key)
}
