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

    const item = {
      title: 'foo bar',
      link: 'mylink.com'
    }

    sendToBuffer(item, function (err) {
      should(logBuffer).be.eql({
        warn: [{
          message: 'hello world',
          accountId: { twitter: '123' },
          opts: {
            media: {
              picture: 'https://blog.windtoday.co/logo.jpg',
              thumbnail: 'https://blog.windtoday.co/logo.jpg',
              link: 'mylink.com'
            }
          }
        }, {
          errorCode: 1023,
          httpCode: 400
        }],
        info: [],
        debug: ['hello world']
      })
      done(err)
    })
  })
})
