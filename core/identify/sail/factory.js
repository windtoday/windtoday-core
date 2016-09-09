'use strict'

const createLogUnmatching = require('../../util/log-unmatching')
const { sails } = require('../../directory')
const size = require('./size')

function factory (log) {
  const logUnmatching = createLogUnmatching('sail', log)

  function createAdd (key, fnValue) {
    function add (acc) {
      const value = fnValue(acc)
      if (value) acc.output[key] = value
      else logUnmatching(key, acc)
    }

    return add
  }

  const addSize = createAdd('size', (acc) => size(acc.input))
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

  return sail
}

module.exports = factory
