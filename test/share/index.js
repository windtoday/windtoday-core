'use strict'

const should = require('should')
const {map, pick} = require('lodash')

const createShare = require('../../core/share/create-share')

const docs = [
  {
    title: 'Ezzy Taka 4,9 2015',
    category: ['sails'],
    provider: 'totalwind',
    seller: 'particular',
    link: 'http:/totalwind.net/foro/viewtopic.php?f=49&t=95973',
    brand: 'Ezzy',
    model: 'Taka',
    price: 550,
    year: 2015,
    'sail.size': 4.9
  },
  {
    title: 'Ezzy Taka 4,9 2015',
    category: ['sails'],
    provider: 'totalwind',
    seller: 'particular',
    link: 'http:/totalwind.net/foro/viewtopic.php?f=49&t=95973',
    brand: 'Ezzy',
    model: 'Taka',
    price: 260,
    year: 2015,
    'sail.size': 4.9
  }
]

function fn (docs, cb) {
  return cb(null, docs)
}

const share = createShare(fn)

describe('share » create', function () {
  it('just items with pricess less than 500', function (done) {
    share(docs, function (err, sharedDocs) {
      const output = map(sharedDocs, item => pick(item, 'price'))
      should(output).be.eql([ { price: 260 } ])
      done(err)
    })
  })
})
