'use strict'

const { assign, get, pick } = require('lodash')

function factory (namespace, log) {
  function logUnmatching (prop, values) {
    let props = pick(values, 'input')

    switch (prop) {
      case 'model':
        assign({
          brand: get(values, `${namespace}.brand.name`),
          input: get(values, 'input')
        }, props)
        break
    }

    log.warn(prop, props)
  }

  return logUnmatching
}

module.exports = factory
