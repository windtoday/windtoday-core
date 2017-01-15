'use strict'

const bufferapp = require('buffer-node')
const CONFIG = require('config').buffer
const {each} = require('async')
const {get} = require('lodash')

const compose = require('./compose')

const accessToken = get(global, CONFIG.access_token)
const client = bufferapp(accessToken)

function update (doc, cb) {
  const text = compose(doc)
  return client.updates.create(text, CONFIG.accounts).nodeify(cb)
}

const updateDocs = (docs, cb) => each(docs, update, cb)

module.exports = updateDocs
