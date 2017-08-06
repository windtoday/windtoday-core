'use strict'

const { get, map, pick } = require('lodash')
const { parallel } = require('async')
const { fallbackImage } = require('config').share

function getOpts (doc, accountType) {
  const { link, title } = doc
  const image = get(doc, 'image', fallbackImage)
  const media = {
    picture: image,
    thumbnail: image,
    link,
    title,
    // normally description of the products are useless
    description: ' '
  }

  return { media }
}

function createUpdate (opts) {
  const { client, accounts, composeMessage, log } = opts

  function wrapRequest (message, accountId, accountType, opts) {
    function request (cb) {
      const req = { message, accountType }
      const callback = wrapCallback(req, cb)

      return client.updates.create(message, accountId, opts).nodeify(callback)
    }

    return request
  }

  function wrapCallback (req, cb) {
    function callback (err) {
      if (err) {
        const apiError = pick(err, ['message', 'errorCode', 'httpCode'])
        if (!apiError) return cb(err)
        log.warn(apiError)
      }
      log.debug(req)
      return cb()
    }
    return callback
  }

  function create (doc, cb) {
    const message = composeMessage(doc)

    const tasks = map(accounts, function (accountId, accountType) {
      const opts = getOpts(doc, accountType)
      return wrapRequest(message, accountId, accountType, opts)
    })

    return parallel(tasks, cb)
  }

  return create
}

module.exports = createUpdate
