'use strict'

const createByCategory = require('./create-by-category')
const createByBrand = require('./create-by-brand')
const createByModel = require('./create-by-model')

module.exports = ({ log, propName, data }) => {
  const getByCategory = createByCategory({log, propName, data})
  const getByBrand = createByBrand({log, propName, data})
  const getByModel = createByModel({log, propName, data})

  return doc => {
    const byCategory = getByCategory(doc)
    const byBrand = getByBrand(doc)
    const byModel = getByModel(doc)

    log.info('score', doc.objectID, {
      byCategory,
      byBrand,
      byModel
    })

    return {
      byCategory,
      byBrand,
      byModel
    }
  }
}
