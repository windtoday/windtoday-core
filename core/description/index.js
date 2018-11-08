'use strict'

const { singular: getCategory } = require('../category/index')
const description = require('import-modules')('./category')

module.exports = doc => {
  const category = getCategory(doc.category)
  return description[category](doc)
}
