'use strict'

const { get } = require('lodash')

module.exports = function getKey (opts) {
  const { provider, seller, path } = opts
  const env = get(process, 'env.NODE_ENV', 'development')
  return `${env}:${provider}:${seller}:${path}`
}
