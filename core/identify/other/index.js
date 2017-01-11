'use strict'

const createAddFactory = require('../create-add')
const category = require('../../category')

function factory (log) {
  const createAdd = createAddFactory('other', log)

  const addCategory = createAdd('category', (acc) => {
    return {
      data: category('others'),
      output: acc.input
    }
  })

  function other (input) {
    const acc = { input, data: {} }
    addCategory(acc)

    return {data: acc.data, output: acc.input}
  }

  return other
}

module.exports = factory
