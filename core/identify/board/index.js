'use strict'

const log = require('../../log')('board_unidentify')
const logUnmatching = require('../../util/log-unmatching')('board', log)
const { boards } = require('../../directory')
const getLitres = require('./litres')

function createAdd (key, fnValue) {
  function add (acc) {
    const value = fnValue(acc)
    if (value) acc.output[key] = value
    else logUnmatching(key, acc)
  }

  return add
}

const addLitres = createAdd('litres', (acc) => getLitres(acc.input))
const addBrand = createAdd('brand', (acc) => boards.brand(acc.board))
const addModel = createAdd('model', (acc) => boards.model(acc.board, acc.input))

function board (str) {
  const acc = {
    board: boards(str),
    input: str,
    output: {}
  }

  addLitres(acc)
  addBrand(acc)
  addModel(acc)

  return acc.output
}

module.exports = board
