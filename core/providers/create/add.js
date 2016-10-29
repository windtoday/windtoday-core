'use strict'

const serializer = require('../../db/serializer')
const schema = require('../../schema')
const db = require('../../db')

function createAdd (opts) {
  const { log, stats } = opts

  function add (data) {
    schema(data, (validationError, instance) => {
      ++stats.total

      if (validationError) {
        log.error(validationError)
        return
      }

      ++stats.add
      db.addObject(serializer(instance))
    })
  }

  return add
}

module.exports = createAdd
