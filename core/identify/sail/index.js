'use strict'

const log = require('../../log')('sail_unidentify')
const logUnmatching = require('../../util/log-unmatching')('sail', log)
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
const addBrand = createAdd('brand', (acc) => acc.dir.brand())
const addModel = createAdd('model', (acc) => acc.dir.model())

function sail (str) {
  const acc = {
    dir: sails(str),
    input: str,
    output: {}
  }

  addSize(acc)
  addBrand(acc)
  addModel(acc)

  return acc.output
}

module.exports = sail
