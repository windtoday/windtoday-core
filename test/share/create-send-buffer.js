'use strict'

const should = require('should')

const createSendBuffer = require('../../core/share/create-send-buffer')

describe('share » send buffer', function () {
  it('log API errors', function (done) {
    const accounts = [{ twitter: '123' }]
    const composeMessage = () => 'hello world'

    const logBuffer = { warn: [], info: [], debug: [] }

    const log = {
      warn: function () {
        logBuffer.warn.push.apply(logBuffer.warn, arguments)
      },
      info: function () {
        logBuffer.info.push.apply(logBuffer.info, arguments)
      },
      debug: function () {
        logBuffer.debug.push.apply(logBuffer.debug, arguments)
      }
    }

    const client = {
      updates: {
        create: function (message, accounts) {
          return {
            nodeify: function (cb) {
              const err = { errorCode: 1023, httpCode: 400 }
              return cb(err)
            }
          }
        }
      }
    }

    const opts = { client, accounts, composeMessage, log }
    const sendToBuffer = createSendBuffer(opts)

    sendToBuffer('foo bar', function (err) {
      should(logBuffer).be.eql({
        warn: ['sendBuffer', { errorCode: 1023, httpCode: 400 }],
        info: [],
        debug: ['sendBuffer', 'hello world']
      })
      done(err)
    })
  })
})
