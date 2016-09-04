'use strict'

const log = require('../../log')('board_unidentify')
const { boards } = require('../../directory')
const { pick, get } = require('lodash')

function logUnmatching (prop, values) {
  let props

  switch (prop) {
    case 'size':
      props = pick(values, 'input')
      break
    case 'brand':
      props = pick(values, 'input')
      break
    case 'model':
      props = {
        brand: get(values, 'board.brand.name'),
        input: get(values, 'input')
      }
      break
  }

  log.warn(prop, props)
}

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
