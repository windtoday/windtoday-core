'use strict'

const { get, map, partial } = require('lodash')
const CONFIG = require('config').facebook
const req = require('simple-get')

const appId = get(global, CONFIG.app_id)
const appSecret = get(global, CONFIG.app_secret)
const { limit, groups_ids } = CONFIG

const batch = map(groups_ids, function (id) {
  return {
    method: 'GET',
    relative_url: `/${id}/feed?limit=${limit}`
  }
})

const opts = {
  method: 'POST',
  url: 'https://graph.facebook.com',
  form: {
    access_token: `${appId}|${appSecret}`,
    batch: JSON.stringify(batch)
  },
  json: true
}

module.exports = partial(req.concat, opts)
