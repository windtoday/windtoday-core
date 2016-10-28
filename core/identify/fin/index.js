'use strict'

const createAddFactory = require('../create-add')
const { fins } = require('../../directory')
const category = require('../../category')

function factory (log) {
  const createAdd = createAddFactory('fin', log)
  const addType = createAdd('size', (acc) => acc.dir.type)
  const addBrand = createAdd('brand', (acc) => acc.dir.brand)
  const addCategory = createAdd('category', (acc) => category.fins)

  function fin (str) {
    const acc = {
      dir: fins(str),
      input: str,
      output: {}
    }

    addType(acc)
    addBrand(acc)
    addCategory(acc)

    return acc.output
  }

  return fin
}

module.exports = factory
