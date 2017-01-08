'use strict'

function compose (doc) {
  const {title, price, url} = doc
  return `${title} ${price}€: ${url}`
}

module.exports = compose
