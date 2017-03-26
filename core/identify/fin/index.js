'use strict'

const createDirectoryFlow = require('../../directory/create-flow')
const { accesories, fins } = require('../../directory')
const createAddFactory = require('../create-add')
const category = require('../../category')
const size = require('./size')

const directory = createDirectoryFlow([fins, accesories])

function factory (log) {
  const createAdd = createAddFactory('fin', log)

  const addType = createAdd('type', (acc) => {
    return {
      data: acc.dir.data.type,
      output: acc.dir.output
    }
  })

  const addBrand = createAdd('brand', (acc) => {
    return {
      data: acc.dir.data.brand,
      output: acc.dir.output
    }
  })

  const addCategory = createAdd('category', (acc) => {
    return {
      data: category('fins'),
      output: acc.input
    }
  })

  const addSize = createAdd('size', (acc) => {
    return size(acc.input)
  })

  function fin (input) {
    const dir = directory(input)
    const acc = { dir, input, data: {} }

    addCategory(acc)
    addBrand(acc)
    addType(acc)
    addSize(acc)

    return {data: acc.data, output: acc.input}
  }

  return fin
}

module.exports = factory
