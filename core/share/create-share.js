'use strict'

const { each, waterfall } = require('async')
const bufferapp = require('buffer-node')
const { get } = require('lodash')

const CONFIG = require('config').buffer
const { accounts, access_token } = CONFIG
const accessToken = get(global, access_token)

const createSendBuffer = require('./create-send-buffer')

function createShare (composeMessage, getShareables) {
  function share (opts) {
    const { log } = opts
    const client = bufferapp(accessToken)
    const sendToBuffer = createSendBuffer({
      client,
      accounts,
      composeMessage,
      log
    })

    function createUpdates (docs, cb) {
      return each(docs, sendToBuffer, cb)
    }

    function shuffleAccount (account, cb) {
      return client.profile(account).updates.shuffle().nodeify(err => cb(err))
    }

    function shuffleUpdates (cb) {
      return each(accounts, shuffleAccount, cb)
    }

    function addBuffer (docs, cb) {
      const shareables = getShareables(docs)
      const tasks = [
        next => createUpdates(shareables, next),
        next => shuffleUpdates(next)
      ]
      return waterfall(tasks, cb)
    }

    return addBuffer
  }

  return share
}

module.exports = createShare
