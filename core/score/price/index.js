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

  const getBrandScore = (item, byCategory) => getByBrand(item) || byCategory
  const getModelScore = (item, byCategory) => getByModel(item) || byCategory
  const getYearSscore = (item, byCategory) => getByYear(item) || byCategory

  return doc => {
    const byCategory = getByCategory(doc)
    const byModel = getModelScore(doc, byCategory)
    const byYear = getYearSscore(doc, byCategory)
    const byBrand = getBrandScore(doc, byCategory)

    const score = weightedMean([
      [byModel, 5],
      [byBrand, 4],
      [byYear, 3],
      [byCategory, 4]
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
