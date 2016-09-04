'use strict'

const log = require('../../log')('sail_detector')
const sails = require('../../directory/sails')
const { pick, get } = require('lodash')
const getSize = require('./size')

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
        brand: get(values, 'sail.brand.name'),
        input: get(values, 'input')
      }
      break
  }

  log.warn(`unmatching ${prop}`, props)
}

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
