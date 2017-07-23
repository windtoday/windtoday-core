'use strict'

const createShare = require('../../share')

function createShareWorker ({ log, data }) {
  const share = createShare({ log })
  const execWorker = cb => share(data, cb)

  execWorker.log = log

  return execWorker
}

module.exports = createShareWorker
