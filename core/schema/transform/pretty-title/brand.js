'use strict'

const { size, assign, flow, reduce, replace } = require('lodash')

const createDirectoryFlow = require('../../../directory/create-flow')

const {
  sails,
  boards,
  accesories
} = require('../../../directory')

const REPLACEMENT = '{{BRAND}}'

const assignItemTitle = (item, title) => assign({}, item, {title})

function createPrettyBrand (directory) {
  function prettyBrand (item) {
    const {title, brand} = item
    if (!brand) return title

    const {output} = directory(title, {
      findModel: false,
      strmatchOpts: {
        replacement: REPLACEMENT
      }
    })

    return replace(output, REPLACEMENT, brand)
  }

  return prettyBrand
}

const transformers = {
  sails: createPrettyBrand(sails),
  booms: createPrettyBrand(createDirectoryFlow([sails, accesories])),
  masts: createPrettyBrand(createDirectoryFlow([sails, accesories])),
  boards: createPrettyBrand(boards)
}

const addTransformer = (acc, transformer) => (
  acc.push(size(acc) ? assignItemTitle(transformer) : transformer)
)

function prettyBrand (item) {
  const {category: categories} = item
  const tranformers = reduce(categories, function (acc, category) {
    const transformer = transformers[category]
    addTransformer(acc, transformer)
    return acc
  }, [])

  return flow(tranformers)(item)
}

module.exports = prettyBrand
