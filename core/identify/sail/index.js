'use strict'

const log = require('../../log')('sail_unidentify')
const logUnmatching = require('../../util/log-unmatching')(log)
const { sails } = require('../../directory')
const getSize = require('./size')

function createAdd (key, fnValue) {
  function add (acc) {
    const value = fnValue(acc)
    if (value) acc.output[key] = value
    else logUnmatching(key, acc)
  }

  return add
}

const addSize = createAdd('size', (acc) => getSize(acc.input))
const addBrand = createAdd('brand', (acc) => sails.brand(acc.sail))
const addModel = createAdd('model', (acc) => sails.model(acc.sail, acc.input))

function sail (str) {
  const acc = {
    sail: sails(str),
    input: str,
    output: {}
  }

  addSize(acc)
  addBrand(acc)
  addModel(acc)

  return acc.output
}

module.exports = sail
