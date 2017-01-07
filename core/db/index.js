'use strict'

const { sortBy, difference, map, size, mapValues } = require('lodash')
const { waterfall, parallel } = require('async')

const search = require('./search')
const state = require('./state')

const CONST = {
  DIFF_ID: 'title'
}

function add (opts, cb) {
  const {key, docs} = opts
  const value = sortBy(docs, CONST.DIFF_ID)

  const tasks = [
    function compare (next) {
      return state.compare({key, value, id: CONST.DIFF_ID}, next)
    },
    function update (diff, next) {
      const stats = mapValues(diff, size)

      const subTasks = [
        (done) => search.addObjects(diff.added, done),
        (done) => search.deleteObjects(map(diff.removed, CONST.DIFF_ID), done)
      ]

      const newState = sortBy(difference(value, diff.removed), CONST.DIFF_ID)
      return parallel(subTasks, (err) => next(err, newState, stats))
    },
    function saveState (value, stats, next) {
      return state.set({key, value}, (err) => next(err, stats))
    }
  ]

  return waterfall(tasks, cb)
}

module.exports = { add }
