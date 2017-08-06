'use strict'

const createDirectoryFlow = require('../../directory/create-flow')
const { accesories, sails } = require('../../directory')
const boomRangeSize = require('../../range/boom-size')
const createAddFactory = require('../create-add')
const category = require('../../category')
const {get} = require('lodash')
const size = require('./size')
const type = require('./type')

const directory = createDirectoryFlow([sails, accesories])

function factory (log) {
  const createAdd = createAddFactory('boom', log)

  const addSizeRange = createAdd('size range', acc => {
    const size = get(acc, 'data.size')
    const data = size && boomRangeSize(size)
    return {data}
  })

  const addCategory = createAdd('category', acc => ({
    data: category('booms'),
    output: acc.input
  }))

  const addBrand = createAdd('brand', acc => ({
    data: acc.dir.data.brand,
    output: acc.dir.output
  }))

  const addType = createAdd('type', acc => type(acc.input, acc))
  const addSize = createAdd('size', acc => size(acc.input))

  function boom (input) {
    const dir = directory(input)
    const acc = { dir, input, data: {} }

    addCategory(acc)
    addBrand(acc)
    addSize(acc)
    addSizeRange(acc)
    addType(acc)

    return { data: acc.data, output: acc.input }
  }

  return boom
}

module.exports = factory
