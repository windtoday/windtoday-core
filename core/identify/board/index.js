'use strict'

const createLogUnmatching = require('../../util/log-unmatching')
const { boards } = require('../../directory')
const category = require('../../category')
const litres = require('./litres')

function factory (log) {
  const logUnmatching = createLogUnmatching('board', log)

  function createAdd (key, fnValue) {
    function add (acc) {
      const value = fnValue(acc)
      if (value) acc.output[key] = value
      else logUnmatching(key, acc)
    }

    return add
  }

  const addLitres = createAdd('litres', (acc) => litres(acc.input))
  const addBrand = createAdd('brand', (acc) => acc.dir.brand())
  const addModel = createAdd('model', (acc) => acc.dir.model())
  const addCategory = createAdd('category', (acc) => category.boards)

  function board (data) {
    const { title } = data

    const acc = {
      dir: boards(title),
      input: title,
      output: {}
    }

    addCategory(acc)
    addLitres(acc)
    addBrand(acc)
    addModel(acc)

    return acc.output
  }

  return board
}

module.exports = factory
