'use strict'

const { assign, get, pick } = require('lodash')

function factory (namespace, log) {
  function logUnmatching (key, acc) {
    let values = pick(acc, 'input')

    switch (key) {
      case 'model':
        values = assign({brand: get(acc, 'dir.data.brand')}, values)
        break
    }

    log.warn(key, values)
  }

  return logUnmatching
}

module.exports = factory
