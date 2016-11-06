'use strict'

const { get, merge, map, noop, reduce, omit } = require('lodash')
const serializer = require('../schema/serializer')
const detectCategories = require('./category')
const category = require('../category')
const createLogger = require('../log')
const noopIdentifier = () => noop
const identify = require('.')

function createCategoryLogger (loggerKeyword, category) {
  return createLogger(`${loggerKeyword}_autodetection_${category}_unidentify`)
}

function createAutodetection (loggerKeyword) {
  function autodetect (str) {
    const categories = detectCategories(str)

    const identifiers = map(categories, function (name) {
      const fn = get(identify, category.singular(name), noopIdentifier)
      return {name, fn}
    })

    const detection = reduce(identifiers, function (acc, identify) {
      const { name, fn } = identify
      const log = createCategoryLogger(loggerKeyword, name)
      const data = serializer(fn(log)(str))
      merge(acc, omit(data, ['category']))
      return acc
    }, {})

    return merge({ category: categories }, detection)
  }

  return autodetect
}

module.exports = createAutodetection
