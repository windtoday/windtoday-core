'use strict'

const createAddFactory = require('../create-add')
const { sails } = require('../../directory')
const category = require('../../category')
const carbon = require('./carbon')
const size = require('./size')
const type = require('./type')

function factory (log) {
  const createAdd = createAddFactory('mast', log)

  const addCategory = createAdd('category', (acc) => {
    return {
      data: category('masts'),
      output: acc.input
    }
  })

  const addBrand = createAdd('brand', (acc) => {
    return {
      data: acc.dir.data.brand,
      output: acc.dir.output
    }
  })

  const addType = createAdd('type', (acc) => type(acc.input))
  const addCarbon = createAdd('carbon', (acc) => carbon(acc.input))
  const addSize = createAdd('size', (acc) => size(acc.input))

  function mast (input) {
    const dir = sails(input)
    const acc = { dir, input, data: {} }

    addCategory(acc)
    addBrand(acc)
    addType(acc)
    addCarbon(acc)
    addSize(acc)

    return {data: acc.data, output: acc.input}
  }

  return mast
}

module.exports = factory
