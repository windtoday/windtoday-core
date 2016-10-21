'use strict'

function createLoggerKeyword (opts) {
  const { provider, type, category } = opts
  let keyword = `${provider}_${type}`
  if (category) keyword += `_${category}`
  return keyword
}

module.exports = createLoggerKeyword
