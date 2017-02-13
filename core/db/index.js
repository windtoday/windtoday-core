'use strict'

const { chain, map, size, mapValues, concat } = require('lodash')
const { waterfall, parallel } = require('async')

const search = require('./search')
const state = require('./state')

const CONST = {
  SORT_ID: 'title',
  UNIQUE_ID: ['title', 'link'],
  DIFF_ID: ['title', 'price', 'link']
}

const getSnapshot = (collection) => {
  return chain(collection)
  .uniqBy(CONST.UNIQUE_ID)
  .sortBy(CONST.SORT_ID)
  .value()
}

function add (opts, cb) {
  const {key, docs} = opts

  const tasks = [
    function compare (next) {
      const ids = CONST.DIFF_ID
      const value = getSnapshot(docs)
      return state.compare({key, value, ids}, next)
    },
    function update (diff, next) {
      const stats = mapValues(diff, size)
      const {added, common, removed} = diff
      const newDocs = concat(common, added)
      const newState = getSnapshot(newDocs)

      console.log('DEBUG ::')
      console.log('added', added)
      console.log('removed', removed)

      const subTasks = [
        (done) => search.addObjects(added, done),
        (done) => search.deleteObjects(map(removed, CONST.UNIQUE_ID), done)
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
