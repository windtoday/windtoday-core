'use strict'

const isAllReachable = require('is-all-reachable')
const HOSTS = require('config').check_hosts

function isUp (cb) {
  isAllReachable(HOSTS, function (err, isAllAvailable, unReachableHost) {
    if (err) return cb(err)
    if (!isAllAvailable) return cb(`unreachable host '${unReachableHost}'`)
    return cb()
  })
}

module.exports = isUp
