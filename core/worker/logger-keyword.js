'use strict'

function createLoggerKeyword (opts) {
  const { provider, seller, category } = opts
  let keyword = `${provider}_${seller}`
  if (category) keyword += `_${category}`
  return keyword
}

module.exports = createLoggerKeyword
