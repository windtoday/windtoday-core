'use strict'

const createAddFactory = require('../create-add')
const category = require('../../category')
const type = require('./type')

function factory (log) {
  const createAdd = createAddFactory('mast', log)
  const addCategory = createAdd('category', (acc) => category.masts)
  const addType = createAdd('type', (acc) => type(acc.input))

  function mast (str) {
    const acc = {
      input: str,
      output: {}
    }

    addType(acc)
    addCategory(acc)

    return acc.output
  }

  return mast
}

module.exports = factory
