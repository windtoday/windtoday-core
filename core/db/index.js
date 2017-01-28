'use strict'

const { chain, map, size, mapValues } = require('lodash')
const { waterfall, parallel } = require('async')

const search = require('./search')
const state = require('./state')

const CONST = {
  UNIQUE_ID: 'title',
  DIFFERENCE_IDS: ['title', 'price']
}

function add (opts, cb) {
  const {key, docs} = opts

  const value = chain(docs)
  .uniqBy(CONST.UNIQUE_ID)
  .sortBy(CONST.UNIQUE_ID)
  .value()

  const tasks = [
    function compare (next) {
      const ids = CONST.DIFFERENCE_IDS
      return state.compare({key, value, ids}, next)
    },
    function update (diff, next) {
      const stats = mapValues(diff, size)
      const {added, removed} = diff

      const subTasks = [
        (done) => search.addObjects(added, done),
        (done) => search.deleteObjects(map(removed, CONST.UNIQUE_ID), done)
      ]

      const newState = chain(value)
        .difference(removed)
        .uniqBy(CONST.UNIQUE_ID)
        .sortBy(CONST.UNIQUE_ID)
        .value()

      return parallel(subTasks, (err) => next(err, newState, added, stats))
    },
    function saveState (value, added, stats, next) {
      return state.set({key, value}, (err) => next(err, added, stats))
    }
  ]

  return waterfall(tasks, cb)
}

module.exports = { add }
