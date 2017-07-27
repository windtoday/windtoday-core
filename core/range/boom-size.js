'use strict'

const { lt, inRange } = require('lodash')

module.exports = boomSize => {
  if (lt(boomSize, 100)) return '<100cm'
  if (inRange(boomSize, 100, 150)) return '100cm to 150cm'
  if (inRange(boomSize, 150, 200)) return '150cm to 200cm'
  return '>200cm'
}
