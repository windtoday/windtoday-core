'use strict'

const { lt, inRange } = require('lodash')

module.exports = carbonSize => {
  if (lt(carbonSize, 10)) return 'C0 to C10'
  if (inRange(carbonSize, 10, 20)) return 'C10 to C20'
  if (inRange(carbonSize, 20, 30)) return 'C20 to C30'
  if (inRange(carbonSize, 30, 40)) return 'C30 to C40'
  if (inRange(carbonSize, 40, 50)) return 'C40 to C50'
  if (inRange(carbonSize, 50, 60)) return 'C50 to C60'
  if (inRange(carbonSize, 60, 70)) return 'C60 to C70'
  if (inRange(carbonSize, 70, 80)) return 'C70 to C80'
  if (inRange(carbonSize, 80, 90)) return 'C80 to C90'
  return 'C90 to C100'
}
