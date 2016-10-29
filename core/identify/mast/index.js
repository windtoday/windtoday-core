'use strict'

const createAddFactory = require('../create-add')
const category = require('../../category')
const carbon = require('./carbon')
const size = require('./size')
const diameter = require('./diameter')

function factory (log) {
  const createAdd = createAddFactory('mast', log)
  const addCategory = createAdd('category', (acc) => category('masts'))
  const addDiameter = createAdd('diameter', (acc) => diameter(acc.input))
  const addCarbon = createAdd('carbon', (acc) => carbon(acc.input))
  const addSize = createAdd('size', (acc) => size(acc.input))

  function mast (str) {
    const acc = {
      input: str,
      output: {}
    }

    addDiameter(acc)
    addCarbon(acc)
    addSize(acc)
    addCategory(acc)

    return acc.output
  }

  return mast
}

module.exports = factory
