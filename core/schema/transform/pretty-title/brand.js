'use strict'

const { size, assign, flow, reduce, replace } = require('lodash')

const {sails, boards} = require('../../../directory')

const REPLACEMENT = '{{BRAND}}'

const assignItemTitle = (item, title) => assign({}, item, {title})

function prettySailBrand (item) {
  const {title, brand} = item
  if (!brand) return title

  const {output} = sails(title, {
    findModel: false,
    strmatchOpts: {
      replacement: REPLACEMENT
    }
  })

  return replace(output, REPLACEMENT, brand)
}

function prettyBoardBrand (item) {
  const {title, brand} = item
  if (!brand) return title

  const {output} = boards(title, {
    findModel: false,
    strmatchOpts: {
      replacement: REPLACEMENT
    }
  })

  return replace(output, REPLACEMENT, brand)
}

const transformers = {
  sails: prettySailBrand,
  booms: prettySailBrand,
  boards: prettyBoardBrand
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
