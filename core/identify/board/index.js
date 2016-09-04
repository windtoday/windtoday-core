'use strict'

const log = require('../../log')('board_unidentify')
const logUnmatching = require('../../util/log-unmatching')(log)
const { boards } = require('../../directory')

function createAdd (key, fnValue) {
  function add (acc) {
    const value = fnValue(acc)
    if (value) acc.output[key] = value
    else logUnmatching(key, acc)
  }

  return add
}

const addBrand = createAdd('brand', (acc) => boards.brand(acc.board))
const addModel = createAdd('model', (acc) => boards.model(acc.board, acc.input))

function board (str) {
  const acc = {
    board: boards(str),
    input: str,
    output: {}
  }

  addBrand(acc)
  addModel(acc)

  return acc.output
}

module.exports = board
