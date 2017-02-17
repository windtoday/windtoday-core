'use strict'

const { map, size, mapValues, concat } = require('lodash')
const { waterfall, parallel } = require('async')

const createSnapshot = require('../util/create-snapshot')
const search = require('./search')
const state = require('./state')

const CONST = {
  SNAPSHOT_OPTS: {
    sortId: 'title',
    uniqId: ['url', 'title']
  },
  DIFF_IDS: ['title', 'url', 'price'],
  REMOVE_ID: 'objectID'
}

const getSnapshot = createSnapshot(CONST.SNAPSHOT_OPTS)

function add (opts, cb) {
  const {key, docs} = opts

  const tasks = [
    function compare (next) {
      const ids = CONST.DIFF_IDS
      const value = getSnapshot(docs)
      return state.compare({key, value, ids}, next)
    },
    function update (diff, next) {
      const stats = mapValues(diff, size)
      const {added, common, removed} = diff
      const newDocs = concat(common, added)
      const newState = getSnapshot(newDocs)
      const removedIds = map(removed, CONST.REMOVE_ID)
      const subTasks = [
        (done) => search.deleteObjects(removedIds, done),
        (done) => search.addObjects(added, done)
      ]
      return parallel(subTasks, (err) => next(err, newState, added, stats))
    },
    function saveState (value, added, stats, next) {
      return state.set({key, value}, (err) => next(err, added, stats))
    }
  ]

  return waterfall(tasks, cb)
}

module.exports = { add }
