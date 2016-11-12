'use strict'

const createAddFactory = require('../create-add')
const category = require('../../category')
const size = require('./size')
const type = require('./type')

function factory (log) {
  const createAdd = createAddFactory('boom', log)

  const addCategory = createAdd('category', (acc) => {
    return {
      data: category('booms'),
      output: acc.input
    }
  })

  const addType = createAdd('type', (acc) => type(acc.input))
  const addSize = createAdd('size', (acc) => size(acc.input))

  function boom (input) {
    const acc = { input, data: {} }

    addCategory(acc)
    addSize(acc)
    addType(acc)

    return {data: acc.data, output: acc.input}
  }

  return boom
}

module.exports = factory
