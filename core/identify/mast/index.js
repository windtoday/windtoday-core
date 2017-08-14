'use strict'

const createDirectoryFlow = require('../../directory/create-flow')
const { accesories, sails } = require('../../directory')
const createAddFactory = require('../create-add')
const category = require('../../category')
const carbon = require('./carbon')
const size = require('./size')
const type = require('./type')

const directory = createDirectoryFlow([sails, accesories])

function factory (log) {
  const createAdd = createAddFactory('mast', log)

  const addCategory = createAdd('category', acc => ({
    data: category('masts'),
    output: acc.input
  }))

  const addBrand = createAdd('brand', acc => ({
    data: acc.dir.data.brand,
    output: acc.dir.output
  }))

  const addType = createAdd('type', acc => type(acc.input))
  const addCarbon = createAdd('carbon', acc => carbon(acc.input))
  const addSize = createAdd('size', acc => size(acc.input))

  function mast (input) {
    const dir = directory(input)
    const acc = { dir, input, data: {} }

    addCategory(acc)
    addBrand(acc)
    addType(acc)
    addCarbon(acc)
    addSize(acc)

    return { data: acc.data, output: acc.input }
  }

  return mast
}

module.exports = factory
