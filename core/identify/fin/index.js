'use strict'

const createAddFactory = require('../create-add')
const { fins } = require('../../directory')
const category = require('../../category')
const type = require('../boom/type')
const size = require('./size')

function factory (log) {
  const createAdd = createAddFactory('fin', log)
  const addBox = createAdd('box', (acc) => acc.dir.box)
  const addBrand = createAdd('brand', (acc) => acc.dir.brand)
  const addCategory = createAdd('category', (acc) => category('fins'))
  const addSize = createAdd('size', (acc) => size(acc.input))
  const addType = createAdd('type', (acc) => type(acc.input))

  function fin (str) {
    const acc = {
      dir: fins(str),
      input: str,
      output: {}
    }

    addSize(acc)
    addBox(acc)
    addType(acc)
    addBrand(acc)
    addCategory(acc)

    return acc.output
  }

  return fin
}

module.exports = factory
