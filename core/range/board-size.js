'use strict'

const { lt, inRange } = require('lodash')

module.exports = boardSize => {
  if (lt(boardSize, 70)) return '<70l'
  if (inRange(boardSize, 70, 80)) return '70l to 80l'
  if (inRange(boardSize, 80, 90)) return '80l to 90l'
  if (inRange(boardSize, 90, 100)) return '90l to 100l'
  if (inRange(boardSize, 100, 110)) return '100l to 110l'
  if (inRange(boardSize, 110, 120)) return '110l to 120l'
  if (inRange(boardSize, 120, 130)) return '120l to 130l'
  return '>130l'
}
