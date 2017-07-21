'use strict'

const { assign } = require('lodash')

const schema = require('../../schema')

function createAdd (opts) {
  const { log, isForced } = opts
  function add (acc, doc, cb) {
    schema(doc, function (validationError, docValidated) {
      if (!validationError) {
        acc.push(assign({ isForced }, docValidated))
      } else {
        log.error('schema', {
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
