'use strict'

const bufferapp = require('buffer-node')
const CONFIG = require('config').buffer
const compose = require('./compose')
const {each} = require('async') // eslint-disable-line
const {get} = require('lodash')

const accessToken = get(global, CONFIG.access_token)
const client = bufferapp(accessToken)

function update (doc, cb) { // eslint-disable-line
  const text = compose(doc)
  return client.updates.create(text, CONFIG.accounts).nodeify(cb)
}

const updateDocs = (docs, cb) => cb()

module.exports = updateDocs
