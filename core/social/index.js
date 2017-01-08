'use strict'

const bufferapp = require('buffer-node')
const CONFIG = require('CONFIG').buffer
const compose = require('./compose.js')
const {each} = require('async')
const {get} = require('lodash')

const accessToken = get(global, CONFIG.access_token)
const client = bufferapp(accessToken)

function update (doc, cb) {
  const text = compose(doc)
  return client.updates.create(text, CONFIG.accounts).nodeify(cb)
}

const updateDocs = (docs, cb) => each(docs, update, cb)

module.exports = updateDocs
