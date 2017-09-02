'use strict'

const { singular: getCategory } = require('../category/index')
const description = require('req-all')('./category')

module.exports = doc => {
  const category = getCategory(doc.category)
  return description[category](doc)
}
