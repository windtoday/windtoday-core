'use strict'

const schema = require('../../schema')
const {assign} = require('lodash')

function createAdd (opts) {
  const { log, isForced } = opts
  function add (acc, doc, cb) {
    doc = assign(doc, {isForced})
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
