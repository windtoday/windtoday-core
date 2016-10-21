'use strict'

const schema = require('../../schema')
const { addObject } = require('../../db')

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
      addObject(instance)
    })
  }

  return add
}

module.exports = createAdd
