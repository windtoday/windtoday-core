'use strict'

module.exports = function createParams (opts) {
  if (!opts.provider) throw TypeError('Need to provide the provider.')
  if (!opts.seller) throw TypeError('Need to provide the seller.')
  const { provider, seller, path } = opts

  let filters = `provider:${provider} AND seller:${seller}`
  if (path) filters += ` AND path:${path}`
  return {filters}
}
