'use strict'

const createAddFactory = require('../create-add')
const { accesories } = require('../../directory')
const category = require('../../category')

function factory (log) {
  const createAdd = createAddFactory('other', log)

  const addBrand = createAdd('brand', (acc) => {
    return {
      data: acc.dir.data.brand,
      output: acc.dir.output
    }
  })

  const addCategory = createAdd('category', (acc) => {
    return {
      data: category('others'),
      output: acc.input
    }
  })

  function other (input) {
    const dir = accesories(input)
    const acc = { dir, input, data: {} }

    addCategory(acc)
    addBrand(acc)

    return {data: acc.data, output: acc.input}
  }

  return other
}

module.exports = factory
