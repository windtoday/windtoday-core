'use strict'

const {includes, get} = require('lodash')

const CONFIG = require('config').buffer
const {rateLimitWaitMs, rateLimitErrorsCode} = CONFIG

const isRetryAllowed = (err) => includes(rateLimitErrorsCode, get(err, 'errorCode'))

function createUpdate (opts) {
  const {client, accounts, composeMessage, log} = opts

  function create (doc, cb) {
    const message = composeMessage(doc)
    const doRequest = () => client.updates.create(message, accounts).nodeify(callback)
    function callback (err) {
      if (!isRetryAllowed(err)) {
        log.info(`created share ${message}`)
        return cb(err)
      }

      log.warn('Rate limit reached, waiting %sms', rateLimitWaitMs)
      return setTimeout(doRequest, rateLimitWaitMs)
    }

    return doRequest()
  }

  return create
}

module.exports = createUpdate
