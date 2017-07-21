'use strict'

const should = require('should')

const getTitleScore = require('../../core/score/title')

describe('core » score » title', function () {
  it('if required fields are not present, value is 0', function () {
    should(getTitleScore({})).be.equal(0)
  })
})
