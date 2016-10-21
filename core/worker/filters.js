'use strict'

function createFilters (opts) {
  const { provider, type, category } = opts
  let filters = `provider:${provider} AND type:${type}`
  if (category) filters += ` AND category:${category}`
  return filters
}

module.exports = createFilters
