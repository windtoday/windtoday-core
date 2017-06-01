'use strict'

const {assign} = require('lodash')

const schema = require('../../schema')

function createAdd (opts) {
  const { log, isForced } = opts
  function add (acc, doc, cb) {
    doc = assign(doc, {isForced})
    schema(doc, (validationError, docValidated) => {
      if (!validationError) {
        acc.push(docValidated)
      } else {
        log.error(schema, {
          key: validationError.key,
          value: validationError.value,
          title: doc.title
        })
      }

      return cb(null, acc)
    })
  }

  return add
}

module.exports = createAdd
