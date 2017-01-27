'use strict'

const isAllReachable = require('is-all-reachable')

function checkHosts (hosts, cb) {
  isAllReachable(hosts, function (err, isAllAvailable, unReachableHost) {
    if (err) return cb(err)
    if (!isAllAvailable) return cb(`unreachable host '${unReachableHost}'`)
    return cb()
  })
}

module.exports = checkHosts
