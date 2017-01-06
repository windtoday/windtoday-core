'use strict'
const schema = require('../../schema')

function createAdd (opts) {
  const { log } = opts

  function add (accumulator, doc, cb) {
    schema(doc, (validationError, docValidated) => {
      if (validationError) {
        log.error('schema', {
          field: validationError.field,
          title: doc.title
        })
      } else {
        accumulator.push(docValidated)
      }

      return cb(null, accumulator)
    })
  }

  return add
}

module.exports = createAdd
