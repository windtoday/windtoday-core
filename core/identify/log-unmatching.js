'use strict'

const { assign, get, pick } = require('lodash')
const sendRollbar = require('../util/send-rollbar')

function factory (namespace, log) {
  function logUnmatching (key, acc) {
    let values = pick(acc, 'input')

    switch (key) {
      case 'model':
        values = assign({brand: get(acc, 'dir.data.brand')}, values)
        break
    }

    log.warn(key, values)
    sendRollbar('warning', 'unidentify', assign({}, values, {prop: key}))
  }

  return logUnmatching
}

module.exports = factory
