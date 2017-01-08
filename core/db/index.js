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
      const {added, removed} = diff

      const subTasks = [
        (done) => search.addObjects(added, done),
        (done) => search.deleteObjects(map(removed, CONST.DIFF_ID), done)
      ]

      const newState = sortBy(difference(value, removed), CONST.DIFF_ID)
      return parallel(subTasks, (err) => next(err, newState, added, stats))
    },
    function saveState (value, added, stats, next) {
      return state.set({key, value}, (err) => next(err, added, stats))
    }
  ]

  return waterfall(tasks, cb)
}

module.exports = { add }
