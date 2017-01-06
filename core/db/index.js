'use strict'

const { waterfall, parallel } = require('async')
const { concat, map, size, mapValues } = require('lodash')

const search = require('./search')
const state = require('./state')

function add (opts, cb) {
  const {key, docs} = opts

  const tasks = [
    function compare (next) {
      return state.compare({key, value: docs, id: 'title'}, next)
    },
    function update (diff, next) {
      const subTasks = [
        (done) => search.addObjects(diff.added, done),
        (done) => search.deleteObjects(map(diff.removed, 'objectID'), done)
      ]

      const stats = mapValues(diff, size)
      const newState = concat(diff.added, diff.common)
      return parallel(subTasks, (err) => next(err, newState, stats))
    },
    function saveState (newState, stats, next) {
      return state.set({key, value: newState}, (err) => next(err, stats))
    }
  ]

  return waterfall(tasks, cb)
}

module.exports = { add }
