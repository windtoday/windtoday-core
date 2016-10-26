'use strict'

const createAddFactory = require('../create-add')
const category = require('../../category')
const carbon = require('./carbon')
const type = require('./type')

function factory (log) {
  const createAdd = createAddFactory('mast', log)
  const addCategory = createAdd('category', (acc) => category.masts)
  const addType = createAdd('type', (acc) => type(acc.input))
  const addCarbon = createAdd('carbon', (acc) => carbon(acc.input))

  function mast (str) {
    const acc = {
      input: str,
      output: {}
    }

    addType(acc)
    addCarbon(acc)
    addCategory(acc)

    return acc.output
  }

  return mast
}

module.exports = factory
