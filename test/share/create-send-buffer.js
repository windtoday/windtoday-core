'use strict'

const should = require('should')

const createSendBuffer = require('../../core/share/create-send-buffer')

describe('share » send buffer', function () {
  it('handle rate limit', function (done) {
    const accounts = ['123']
    const composeMessage = () => 'hello World'
    const log = { warn: function () {}, info: function () {} }

    let count = 0

    const client = {
      updates: {
        create: function (message, accounts) {
          return {
            nodeify: function (cb) {
              ++count
              const err = (count < 3) ? {errorCode: 1023} : null
              return cb(err)
            }
          }
        }}
    }

    const opts = { client, accounts, composeMessage, log }
    const sendToBuffer = createSendBuffer(opts)
    const timestamp = Date.now()

    sendToBuffer('foo bar', function (err) {
      const now = Date.now()
      const diff = now - timestamp
      should(diff).be.within(1000, 1200)
      done(err)
    })
  })
})
