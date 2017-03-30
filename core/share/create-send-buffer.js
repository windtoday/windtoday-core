'use strict'

const {pick} = require('lodash')
const isApiError = err => Boolean(err.errorCode)

function createUpdate (opts) {
  const {client, accounts, composeMessage, log} = opts

  function create (doc, cb) {
    const message = composeMessage(doc)

    function callback (err) {
      if (!err) return cb()
      if (!isApiError(err)) return cb(err)
      log.warn('sendBuffer', pick(err, ['errorCode', 'httpCode']))
      return cb()
    }

    return client.updates.create(message, accounts).nodeify(callback)
  }

  return create
}

module.exports = createUpdate
