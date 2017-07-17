'use strict'

function composeMessage (doc) {
  const { title, price, link } = doc
  return `${title} €${price} ${link}`
}

module.exports = composeMessage
