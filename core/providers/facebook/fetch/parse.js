'use strict'

const { chain } = require('lodash')
const cleanWhiteSpaces = require('condense-whitespace')

function permalink (str) {
  var [ groupId, docId ] = str.split('_')
  var base = 'https://www.facebook.com/groups'
  return [base, groupId, 'permalink', docId].join('/')
}

function parse (res) {
  return chain(res)
    .map(res => JSON.parse(res.body).data)
    .flatten()
    .filter('message')
    .uniqBy('message')
    .map(function (item) {
      return {
        title: cleanWhiteSpaces(item.message),
        updatedAt: Date.parse(item.updated_time),
        url: permalink(item.id)
      }
    })
    .value()
}

module.exports = parse
