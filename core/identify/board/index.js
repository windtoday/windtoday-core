'use strict'

const createAddFactory = require('../create-add')
const { boards } = require('../../directory')
const category = require('../../category')
const size = require('./size')

function factory (log) {
  const createAdd = createAddFactory('board', log)

  const addSize = createAdd('size', acc => size(acc.input))

  const addBrand = createAdd('brand', acc => ({
    data: acc.dir.data.brand,
    output: acc.dir.output
  }))

  const addModel = createAdd('model', acc => ({
    data: acc.dir.data.model,
    output: acc.dir.output
  }))

  const addType = createAdd('type', acc => ({
    data: acc.dir.data.type,
    output: acc.dir.output
  }))

  const addCategory = createAdd('category', acc => ({
    data: category('boards'),
    output: acc.input
  }))

  function board (input) {
    const dir = boards(input)
    const acc = { dir, input, data: {} }

    addCategory(acc)
    addBrand(acc)
    addModel(acc)
    addType(acc)
    addSize(acc)

    return { data: acc.data, output: acc.input }
  }

  return board
}

module.exports = factory
