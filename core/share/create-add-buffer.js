'use strict'

const bufferapp = require('buffer-node')
const {each, waterfall} = require('async')
const CONFIG = require('config').buffer
const {get} = require('lodash')

const {accounts, access_token} = CONFIG
const accessToken = get(global, access_token)

function createAddBuffer (composeMessage) {
  const client = bufferapp(accessToken)

  function createUpdate (doc, cb) {
    const message = composeMessage(doc)
    return client.updates.create(message, accounts).nodeify(err => cb(err))
  }

  function createUpdates (docs, cb) {
    return each(docs, createUpdate, cb)
  }

  function shuffleAccount (account, cb) {
    return client.profile(account).updates.shuffle().nodeify(err => cb(err))
  }

  function shuffleUpdates (cb) {
    return each(accounts, shuffleAccount, cb)
  }

  function addBuffer (docs, cb) {
    const tasks = [
      (next) => createUpdates(docs, next),
      (next) => shuffleUpdates(next)
    ]
    return waterfall(tasks, cb)
  }

  return addBuffer
}

module.exports = createAddBuffer
