'use strict'

const {waterfall} = require('async')

const createScoreWorker = require('./create-score')
const search = require('../../db/search')

function createStatsWorker (opts) {
  const {log} = opts
  const scoreWorker = createScoreWorker(opts)

  const tasks = [
    function fetchData (next) {
      return search.fetchAll(next)
    },
    function startScoreWorker (data, next) {
      return scoreWorker(data, next)
    }
  ]

  function execWorker (cb) {
    waterfall(tasks, function (err) {
      if (!err) log.info('finished')
      return cb(err)
    })
  }

  execWorker.log = log

  return execWorker
}

module.exports = createStatsWorker
