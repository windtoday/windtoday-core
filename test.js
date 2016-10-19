'use strict'

const { map, flatten, uniqBy } = require('lodash')
const lodash = require('lodash')
const graph = require('fbgraph')
const titly = require('./get-title')
const url = require('url')

const CONST = {
  ACCESS_TOKEN: 'EAACEdEose0cBAGZCgiKZCzDjxvUzR7IvJNW6QVDeC4erYnvegTHObAfToE4QnZCI5YlZCdbhwfpoTmvntUAtNsgWRGEzynXtCuZCyR3u5vRXKOwxuG30fkjugjOZAqr26fxYPFt3KzIIlLPNDf646ZB5nO1r6RuiZBPbfLnj9wqNjQZDZD',
  GROUPS_IDS: [
    '173068032721866',
    '245756195532660',
    '229068620567605',
    '143928749095041'
  ],
  LIMIT: 1
}

const requests = map(CONST.GROUPS_IDS, function (id) {
  return {
    method: 'GET',
    relative_url: `/${id}/feed?limit=${CONST.LIMIT}`
  }
})

graph.setAccessToken(CONST.ACCESS_TOKEN)

function generatePermalink (str) {
  var [ groupId, docId ] = str.split('_')
  var base = 'https://www.facebook.com/groups'
  return [base, groupId, 'permalink', docId].join('/')
}

graph.batch(requests, function (err, res) {
  console.log(err)
  if (err) throw err

  var items = lodash(res)
    .map(res => JSON.parse(res.body).data)
    .flatten()
    .uniqBy('message')
    .map(function (item) {
      return {
        title: titly(item.message),
        updatedAt: item.updated_time,
        provider: 'facebook',
        url: generatePermalink(item.id)
      }
    })
    .value()

  console.log(items)
})

/*
  https://github.com/criso/fbgraph
  https://developers.facebook.com/tools/explorer/145634995501895/?method=GET&path=173068032721866%2Ffeed%3Flimit%3D100&version=v2.8

*/

// const access_token =
//

//
// // graph
// //   .setOptions(options)
// //   .get('/173068032721866/feed', { limit: 100 }, function (err, res) {
// //     console.log(res.data.length)
// //     console.log(res.data)
// //   })
//
