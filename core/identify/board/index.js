'use strict'

const createAddFactory = require('../create-add')
const { boards } = require('../../directory')
const category = require('../../category')
const size = require('./size')

function factory (log) {
  const createAdd = createAddFactory('board', log)
  const addSize = createAdd('size', (acc) => size(acc.input))
  const addBrand = createAdd('brand', (acc) => acc.dir.brand)
  const addModel = createAdd('model', (acc) => acc.dir.model)
  const addCategory = createAdd('category', (acc) => category.boards)

  function board (str) {
    const acc = {
      dir: boards(str),
      input: str,
      output: {}
    }

    addCategory(acc)
    addSize(acc)
    addBrand(acc)
    addModel(acc)

    return acc.output
  }

  return board
}

module.exports = factory
