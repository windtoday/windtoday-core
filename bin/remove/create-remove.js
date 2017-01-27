'use strict'

const {parallel} = require('async')

const createLoggerKeyword = require('../../core/util/create-logger-keyword')
const redis = require('../../core/db/state').client
const createParams = require('./create-params')
const createLogger = require('../../core/log')
const index = require('../../core/db/search')
const getKey = require('./get-key')

function createRemove (flags) {
  const params = createParams(flags)
  const key = getKey(flags)

  const keyword = createLoggerKeyword(flags)

  const log = createLogger({
    keyword: `remove_${keyword}`,
    diff: true
  })

  function remove (cb) {
    const tasks = [
      function deleteKey (next) {
        log.debug('redis:start')
        redis.del(key, function () {
          log.debug('redis:done')
          return next.apply(next, arguments)
        })
      },
      function deleteQuery (next) {
        log.debug('query:start')
        index.deleteByQuery('', params, function () {
          log.debug('query:done')
          return next.apply(next, arguments)
        })
      }
    ]

    return parallel(tasks, cb)
  }

  remove.log = log

  return remove
}

module.exports = createRemove
