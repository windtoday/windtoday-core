'use strict'

function createParams (opts) {
  const { provider, seller, path } = opts
  let filters = `provider:${provider} AND seller:${seller}`
  if (path) filters += ` AND path:${path}`
  return {filters}
}

module.exports = createParams
