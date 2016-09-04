'use strict'

var log = require('../../log')('sail_detector')
var sails = require('../../directory/sails')
var format = require('util').format
var getSize = require('./size')
var lodash = require('lodash')

function logUnmatching (prop, values) {
  var props

  switch (prop) {
    case 'size':
      props = lodash.pick(values, 'input')
      break
    case 'brand':
      props = lodash.pick(values, 'input')
      break
    case 'model':
      props = {
        brand: lodash.get(values, 'sail.brand.name'),
        input: lodash.get(values, 'input')
      }
      break
  }

  var msg = format('unmatching %s', prop)
  log.warn(msg, props)
}

function createAdd (key, fnValue) {
  function add (acc) {
    var value = fnValue(acc)
    if (value) acc.output[key] = value
    else logUnmatching(key, acc)
  }

  return add
}

var addSize = createAdd('size', (acc) => getSize(acc.input))
var addBrand = createAdd('brand', (acc) => sails.brand(acc.sail))
var addModel = createAdd('model', (acc) => sails.model(acc.sail, acc.input))

function sail (str) {
  var acc = {
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
