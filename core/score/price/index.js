'use strict'

const createByCategory = require('./create-by-category')
const createByBrand = require('./create-by-brand')
const createByModel = require('./create-by-model')
const createByYear = require('./create-by-year')
const weightedMean = require('weighted-mean')
const {round} = require('lodash')

module.exports = ({ log, propName, data }) => {
  const getByCategory = createByCategory({log, propName, data})
  const getByBrand = createByBrand({log, propName, data})
  const getByModel = createByModel({log, propName, data})
  const getByYear = createByYear({log, propName, data})

  return doc => {
    const byCategory = getByCategory(doc)
    const byBrand = getByBrand(doc)
    const byModel = getByModel(doc)
    const byYear = getByYear(doc)

    const score = weightedMean([
      [byModel, 2],
      [byBrand, 2],
      [byYear, 2],
      [byCategory, 2]
    ])

    return {
      score: round(score * 100),
      scoreDetail: {
        byCategory: round(byCategory * 100),
        byYear: round(byYear * 100),
        byBrand: round(byBrand * 100),
        byModel: round(byModel * 100)
      }
    }
  }
}
