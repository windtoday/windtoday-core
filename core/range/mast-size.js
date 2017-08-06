'use strict'

const { lt, inRange } = require('lodash')

module.exports = boomSize => {
  if (lt(boomSize, 370)) return '<370cm'
  if (inRange(boomSize, 370, 400)) return '370cm to 400cm'
  if (inRange(boomSize, 400, 430)) return '400cm to 430cm'
  if (inRange(boomSize, 430, 460)) return '430cm to 460cm'
  if (inRange(boomSize, 460, 490)) return '460cm to 490cm'
  if (inRange(boomSize, 490, 520)) return '490cm to 520cm'
  return '>520cm'
}
