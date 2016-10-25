'use strict'

const createAddFactory = require('../create-add')
const { sails } = require('../../directory')
const category = require('../../category')
const size = require('./size')

function factory (log) {
  const createAdd = createAddFactory('sail', log)
  const addSize = createAdd('size', (acc) => size(acc.input))
  const addBrand = createAdd('brand', (acc) => acc.dir.brand())
  const addModel = createAdd('model', (acc) => acc.dir.model())
  const addCategory = createAdd('category', (acc) => category.sails)

  function sail (str) {
    const acc = {
      dir: sails(str),
      input: str,
      output: {}
    }

    addCategory(acc)
    addSize(acc)
    addBrand(acc)
    addModel(acc)

    return acc.output
  }

  return sail
}

module.exports = factory
