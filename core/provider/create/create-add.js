'use strict'

const {assign} = require('lodash')

const sendRollbar = require('../../util/send-rollbar')
const schema = require('../../schema')

function createAdd (opts) {
  const { log, isForced } = opts
  function add (acc, doc, cb) {
    doc = assign(doc, {isForced})
    schema(doc, (validationError, docValidated) => {
      if (!validationError) {
        acc.push(docValidated)
      } else {
        const errMessage = 'schema'
        const errPayload = {
          key: validationError.key,
          value: validationError.value,
          title: doc.title
        }
        sendRollbar('error', errMessage, errPayload)
        log.error(errMessage, errPayload)
      }

      return cb(null, acc)
    })
  }

  return add
}

module.exports = createAdd
