'use strict'
const schema = require('../../schema')

function createAdd (opts) {
  const { stats, log } = opts

  function add (accumulator, doc, cb) {
    schema(doc, (validationError, docValidated) => {
      ++stats.total

      if (validationError) {
        log.error('schema', {
          field: validationError.field,
          title: doc.title
        })
      } else {
        ++stats.add
        accumulator.push(docValidated)
      }

      return cb(null, accumulator)
    })
  }

  return add
}

module.exports = createAdd
