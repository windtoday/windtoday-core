'use strict'

function createFilters (opts) {
  const { provider, type, path } = opts
  let filters = `provider:${provider} AND type:${type}`
  if (path) filters += ` AND provider.path:${path}`
  return {filters}
}

module.exports = createFilters
