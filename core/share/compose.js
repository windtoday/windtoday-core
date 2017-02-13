'use strict'

function compose (doc) {
  const {title, price, link} = doc
  return `${title} €${price} ${link}`
}

module.exports = compose
