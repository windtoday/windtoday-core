'use strict'

const unflatten = require('unflatten')

function deserializer (obj) {
  return unflatten(obj)
}

module.exports = deserializer
