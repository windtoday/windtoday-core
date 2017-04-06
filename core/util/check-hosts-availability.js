'use strict'

const isAllReachable = require('is-all-reachable')

function checkHosts (hosts, cb) {
  isAllReachable(hosts, function (err, isAllAvailable, unReachableHost) {
    if (err) return cb(err)

    if (!isAllAvailable) {
      const err = new Error(`unreachable host '${unReachableHost}'`)
      return cb(err)
    }

    return cb()
  })
}

module.exports = checkHosts
