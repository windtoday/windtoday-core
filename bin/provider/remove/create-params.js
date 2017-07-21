'use strict'

module.exports = function createParams (opts) {
  if (!opts.provider) throw TypeError('Need to provide the provider.')
  const { provider, seller, path } = opts
  let filters = `provider:${provider}`
  if (seller) filters += ` AND seller:${seller}`
  if (path) filters += ` AND path:${path}`
  return { filters }
}
