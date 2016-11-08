'use strict'

const createAddFactory = require('../create-add')
const { boards } = require('../../directory')
const category = require('../../category')
const size = require('./size')

function factory (log) {
  const createAdd = createAddFactory('board', log)

  const addSize = createAdd('size', (acc) => {
    return size(acc.input)
  })

  const addBrand = createAdd('brand', (acc) => {
    return {
      data: acc.dir.data.brand,
      output: acc.dir.output
    }
  })

  const addModel = createAdd('model', (acc) => {
    return {
      data: acc.dir.data.model,
      output: acc.dir.output
    }
  })

  const addCategory = createAdd('category', (acc) => {
    return {
      data: category('boards'),
      output: acc.input
    }
  })

  function board (input) {
    const dir = boards(input)
    const acc = { dir, input, data: {} }

    addCategory(acc)
    addBrand(acc)
    addModel(acc)
    addSize(acc)

    return {data: acc.data, output: acc.input}
  }

  return board
}

module.exports = factory
