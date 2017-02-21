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
  return client.updates.create(text, accounts).nodeify(err => cb(err))
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

function share (docs, cb) {
  const tasks = [
    (next) => createUpdates(docs, next),
    (next) => shuffleUpdates(next)
  ]
  return waterfall(tasks, cb)
}

module.exports = share
