'use strict'

const should = require('should')
const log = require('../../../core/log')('sail_model_unidentify')
const sail = require('../../../core/identify/sail')(log)

function model (str) {
  return sail(str).model
}

describe('identify » sail » model', function () {
  it('not detect', function () {
    [
      ''
    ].forEach(function (str) {
      should(model(str)).be.undefined()
    })
  })

  it('detect', function () {
    [
      'loftsails racing blade',
      'loft sails racingblade',
      'loft racing blade'
    ].forEach(function (str) {
      model(str).should.be.equal('Racing Blade')
    })
  })
})
