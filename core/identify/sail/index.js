'use strict'

const createAddFactory = require('../create-add')
const { sails } = require('../../directory')
const category = require('../../category')
const size = require('./size')

function factory (log) {
  const createAdd = createAddFactory('sail', log)

  const addSize = createAdd('size', acc => size(acc.input))

  const addBrand = createAdd('brand', acc => ({
    data: acc.dir.data.brand,
    output: acc.dir.output
  }))

  const addModel = createAdd('model', acc => ({
    data: acc.dir.data.model,
    output: acc.dir.output
  }))

  const addType = createAdd('type', acc => ({
    data: acc.dir.data.type,
    output: acc.dir.output
  }))

  const addCategory = createAdd('category', acc => ({
    data: category('sails'),
    output: acc.input
  }))

  function sail (input) {
    const dir = sails(input)
    const acc = { dir, input, data: {} }

    addCategory(acc)
    addBrand(acc)
    addModel(acc)
    addType(acc)
    addSize(acc)

    return { data: acc.data, output: acc.input }
  }

  return sail
}

module.exports = factory
