'use strict'

const { lt, inRange } = require('lodash')

module.exports = sailSize => {
  if (lt(sailSize, 3)) return '<3m'
  if (inRange(sailSize, 3, 4)) return '3m to 4m'
  if (inRange(sailSize, 4, 5)) return '4m to 5m'
  if (inRange(sailSize, 5, 6)) return '5m to 6m'
  if (inRange(sailSize, 6, 7)) return '6m to 7m'
  if (inRange(sailSize, 7, 8)) return '7m to 8m'
  if (inRange(sailSize, 8, 9)) return '8m to 9m'
  return '>9m'
}
