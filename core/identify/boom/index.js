'use strict'

const createDirectoryFlow = require('../../directory/create-flow')
const { accesories, sails } = require('../../directory')
const createAddFactory = require('../create-add')
const category = require('../../category')
const size = require('./size')
const type = require('./type')

const directory = createDirectoryFlow([sails, accesories])

function factory (log) {
  const createAdd = createAddFactory('boom', log)

  const addCategory = createAdd('category', acc => {
    return {
      data: category('booms'),
      output: acc.input
    }
  })

  const addBrand = createAdd('brand', acc => {
    return {
      data: acc.dir.data.brand,
      output: acc.dir.output
    }
  })

  const addType = createAdd('type', acc => type(acc.input, acc))
  const addSize = createAdd('size', acc => size(acc.input))

  function boom (input) {
    const dir = directory(input)
    const acc = { dir, input, data: {} }

    addCategory(acc)
    addBrand(acc)
    addSize(acc)
    addType(acc)

    return { data: acc.data, output: acc.input }
  }

  return boom
}

module.exports = factory
