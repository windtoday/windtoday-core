'use strict'

var log = require('../../log')('sail_detector')
var sails = require('../../directory/sails')
var format = require('util').format
var getSize = require('./size')

function logUnmatching (prop, values) {
  var msg = format('unmatching %s', prop)
  log.warn(msg, values)
}

function addSize (acc) {
  var size = getSize(acc.input)
  if (size) acc.output.size = size
  else logUnmatching(size, acc)
}

function addBrand (acc) {
  var brand = sails.getBrand(acc.sail)
  if (brand) acc.output.brand = brand
  else logUnmatching(brand, acc)
}

function addModel (acc) {
  var model = sails.getModel(acc.sail, acc.input)
  if (model) acc.output.model = model
  else logUnmatching(model, acc)
}

function sail (str) {
  var accumulator = {
    sail: sails.find(str),
    input: str,
    output: {}
  }

  addSize(accumulator)
  addBrand(accumulator)
  addModel(accumulator)

  return accumulator.output
}

module.exports = sail
