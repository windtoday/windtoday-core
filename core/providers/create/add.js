'use strict'

const schema = require('../../schema')
const db = require('../../db')

function createAdd (opts) {
  const { stats } = opts

  function add (data, cb) {
    schema(data, (validationError, instance) => {
      ++stats.total

      if (validationError) return cb()

      ++stats.add
      return db.addObject(instance, cb)
    })
  }

  return add
}

module.exports = createAdd
