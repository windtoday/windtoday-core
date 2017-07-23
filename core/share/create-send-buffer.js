'use strict'

const { get, map, pick } = require('lodash')
const { parallel } = require('async')
const { fallbackImage } = require('config').share

function getOpts (doc, accountType) {
  const {link} = doc
  const image = get(doc, 'image', fallbackImage)
  const media = { picture: image, thumbnail: image, link }
  // if (accountType === 'twitter') media.photo = doc.image
  return {media}
}

function createUpdate (opts) {
  const { client, accounts, composeMessage, log } = opts

  function wrapRequest (message, accountId, opts) {
    function request (cb) {
      const req = {message, accountId, opts}
      const callback = wrapCallback(req, cb)

      return client.updates
        .create(message, accountId, opts)
        .nodeify(callback)
    }

    return request
  }

  function wrapCallback (req, cb) {
    function callback (err) {
      if (err) log.warn(req, pick(err, ['messge', 'errorCode', 'httpCode']))
      return cb()
    }
    return callback
  }

  function create (doc, cb) {
    const message = composeMessage(doc)

    const tasks = map(accounts, function (accountId, accountType) {
      const opts = getOpts(doc, accountType)
      return wrapRequest(message, accountId, opts)
    })

    log.debug(message)

    return parallel(tasks, cb)
  }

  return create
}

module.exports = createUpdate
