'use strict'

const bufferapp = require('buffer-node')
const CONFIG = require('config').buffer
const {each, waterfall} = require('async')
const {get} = require('lodash')

const compose = require('./compose')
const {accounts, access_token} = CONFIG

const accessToken = get(global, access_token)
const client = bufferapp(accessToken)

function createUpdate (doc, cb) {
  const text = compose(doc)
  return client.updates.create(text, accounts).nodeify(cb)
}

const createUpdates = (docs, cb) => each(docs, createUpdate, cb)
const shuffleAccount = (account, cb) => client.profile(account).updates.shuffle().nodeify(cb)
const shuffle = (cb) => each(accounts, shuffleAccount, cb)

function share (docs, cb) {
  const tasks = [
    (next) => createUpdates(docs, next),
    (res, next) => shuffle(next)
  ]
  return waterfall(tasks, cb)
}

module.exports = share
