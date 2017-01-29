'use strict'

const schema = require('../../schema')

function createAdd (opts) {
  const { log } = opts

  function add (acc, doc, cb) {
    schema(doc, (validationError, docValidated) => {
      if (validationError) {
        log.error('schema', {
          key: validationError.key,
          value: validationError.value,
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
