'use strict'

const {concat, map, flow, first, get, mapValues, set, chain, reduce} = require('lodash')
const calcPercent = require('calc-percent')

const getItemsByCategory = (data, size) => {
  const addItemByCategory = ({acc, item, categoryName, test}) => {
    if (test(item, categoryName)) incrementPropName(acc, `${categoryName}.${item.provider}`)
    return {acc, item}
  }

  const categories = getUniqValues(data, item => first(item.category))

  const categoriesRules = map(categories, categoryName => ({acc, item}) => addItemByCategory({
    acc,
    item,
    categoryName,
    test: (item, categoryName) => item.category[0] === categoryName
  }))

  const rules = concat(categoriesRules, ({acc, item}) => addItemByCategory({
    acc,
    item,
    categoryName: 'all',
    test: () => true
  }))

  const addItemsByCategory = flow(rules)

  const itemsByCategory = reduce(data, function (acc, item) {
    addItemsByCategory({acc, item})
    return acc
  }, {})

  return mapValues(itemsByCategory, (itemsCategory, category) => {
    const categorySize = size[category].count
    return mapPercent(itemsCategory, categorySize)
  })
}

function getSizeByCategory (data) {
  const sizes = reduce(data, function (acc, item) {
    const categoryName = first(item.category)
    incrementPropName(acc, categoryName)
    incrementPropName(acc, 'all')
    return acc
  }, {})

  return mapPercent(sizes, sizes.all)
}

const incrementPropName = (acc, key) => {
  const count = get(acc, key, 0)
  set(acc, key, count + 1)
}

const mapPercent = (acc, total) => mapValues(acc, count => {
  const percent = getPercent(count, total)
  return {count, percent}
})

const getUniqValues = (data, iteratee) => chain(data)
  .uniqBy(iteratee)
  .map(iteratee)
  .value()

const getPercent = (partial, total) => calcPercent(partial, total, {suffix: '%'})

function insights (data) {
  const size = getSizeByCategory(data)
  return {
    providers: getUniqValues(data, 'provider'),
    size,
    category: getItemsByCategory(data, size)
  }
}

module.exports = insights
