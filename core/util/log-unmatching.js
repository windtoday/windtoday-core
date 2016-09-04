'use strict'

const { pick, get } = require('lodash')

function factory (log) {
  function logUnmatching (prop, values) {
    let props

    switch (prop) {
      case 'size':
        props = pick(values, 'input')
        break
      case 'brand':
        props = pick(values, 'input')
        break
      case 'model':
        props = {
          brand: get(values, 'board.brand.name'),
          input: get(values, 'input')
        }
        break
    }

    log.warn(prop, props)
  }

  return logUnmatching
}

module.exports = factory
