'use strict'

const {assign, pick} = require('lodash')

const DEFAULT = {
  OPTIONS: {
    picture: 'https://windtoday.co/assets/img/logo.jpg',
    thumbnail: 'https://windtoday.co/assets/img/logo.jpg'
  }
}

const getOptions = doc => assign({}, DEFAULT.OPTIONS, {
  title: doc.title,
  picture: doc.image,
  thumbnail: doc.image,
  link: doc.link
})

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

    const options = getOptions(doc)
    return client.updates.create(message, accounts, options).nodeify(callback)
  }

  return create
}

module.exports = createUpdate
