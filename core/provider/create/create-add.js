'use strict'
const schema = require('../../schema')

function createAdd (opts) {
  const { log } = opts

  function add (acc, doc, cb) {
    schema(doc, (validationError, docValidated) => {
      if (validationError) {
        log.error('schema', {
          field: validationError.field,
          title: doc.title
        })
      } else {
        acc.push(docValidated)
      }

      return cb(null, acc)
    })
  }

  return add
}

module.exports = createAdd
