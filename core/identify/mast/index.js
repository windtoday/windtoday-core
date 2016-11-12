'use strict'

const createAddFactory = require('../create-add')
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

  const addType = createAdd('type', (acc) => type(acc.input))
  const addCarbon = createAdd('carbon', (acc) => carbon(acc.input))
  const addSize = createAdd('size', (acc) => size(acc.input))

  function mast (input) {
    const acc = { input, data: {} }

    addCategory(acc)
    addType(acc)
    addCarbon(acc)
    addSize(acc)

    return {data: acc.data, output: acc.input}
  }

  return mast
}

module.exports = factory
