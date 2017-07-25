'use strict'

const { get, isNil, negate } = require('lodash')

const exists = negate(isNil)

const createLogUnmatching = require('./log-unmatching')

function factory (namespace, log) {
  const logUnmatching = createLogUnmatching(namespace, log)

  function createAdd (key, fn) {
    function add (acc) {
      const detection = fn(acc)
      const data = get(detection, 'data')
      const output = get(detection, 'output')

      if (exists(data)) {
        acc.data[key] = data
        // removing the detection from the input
        if (exists(output)) acc.input = output
      } else {
        logUnmatching(key, acc)
      }
    }

    return add
  }

  return createAdd
}

module.exports = factory
