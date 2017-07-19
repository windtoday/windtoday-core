'use strict'

const { pick } = require('lodash')

module.exports = log => (item, propName) =>
  log.warn(
    `missing ${propName} %J`,
    pick(item, ['title', 'provider', 'objectID', 'link'])
  )
