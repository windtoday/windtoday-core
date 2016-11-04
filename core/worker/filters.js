'use strict'

function createFilters (opts) {
  const { provider, seller, path } = opts
  let filters = `provider:${provider} AND seller:${seller}`
  if (path) filters += ` AND provider.path:${path}`
  return {filters}
}

module.exports = createFilters
