'use strict'

const createAddFactory = require('../create-add')
const category = require('../../category')
const size = require('./size')
const type = require('./type')

function factory (log) {
  const createAdd = createAddFactory('boom', log)
  const addCategory = createAdd('category', (acc) => category('booms'))
  const addSize = createAdd('size', (acc) => size(acc.input))
  const addType = createAdd('type', (acc) => type(acc.input))

  function boom (str) {
    const acc = {
      input: str,
      output: {}
    }

    addSize(acc)
    addType(acc)
    addCategory(acc)

    return acc.output
  }

  return boom
}

module.exports = factory
