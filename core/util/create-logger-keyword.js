'use strict'

function createLoggerKeyword (opts) {
  const { provider, seller, path } = opts
  let keyword = `${provider}_${seller}`
  if (path) keyword += `_${path}`
  return keyword
}

module.exports = createLoggerKeyword
