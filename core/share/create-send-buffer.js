'use strict'

const {map, pick} = require('lodash')
const {parallel} = require('async')

const FALLBACK_IMAGE = 'https://windtoday.co/assets/img/logo.jpg'

function getOptions (doc, accountType) {
  const image = doc.image || FALLBACK_IMAGE

  return {
    media: {
      picture: image,
      thumbnail: image,
      link: doc.link,
      photo: accountType === 'twitter' && image
    }
  }
}

const isApiError = err => Boolean(err.errorCode)

function createUpdate (opts) {
  const {client, accounts, composeMessage, log} = opts

  function wrapRequest (message, accountId, options) {
    function request (cb) {
      const callback = wrapCallback(cb)
      return client.updates.create(message, accountId, options).nodeify(callback)
    }

    return request
  }

  function wrapCallback (cb) {
    function callback (err) {
      if (!err) return cb()
      if (!isApiError(err)) return cb(err)
      log.warn('sendBuffer', pick(err, ['errorCode', 'httpCode']))
      return cb()
    }
    return callback
  }

  function create (doc, cb) {
    const message = composeMessage(doc)
    const tasks = map(accounts, function (accountId, accountType) {
      const options = getOptions(doc, accountType)
      return wrapRequest(message, accountId, options)
    })

    return parallel(tasks, cb)
  }

  return create
}

module.exports = createUpdate
