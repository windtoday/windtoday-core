'use strict'

const jsonFuture = require('json-future')
const {fetchAll} = require('../../core/db/search')
const {waterfall} = require('async')

const filename = 'backup.json'

const tasks = [
  next => fetchAll(next),
  (content, next) => jsonFuture.saveAsync(filename, content, next)
]

waterfall(tasks, function (err) {
  if (err) throw err
  console.log('done!')
})
