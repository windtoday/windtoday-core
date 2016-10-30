'use strict'

const schema = require('../../schema')
const db = require('../../db')

function createAdd (opts) {
  const { log, stats } = opts

  function add (data, cb) {
    schema(data, (validationError, instance) => {
      ++stats.total

      if (validationError) {
        log.error(validationError)
        return cb()
      }

      ++stats.add
      return db.addObject(instance, cb)
    })
  }

  return add
}

module.exports = createAdd
