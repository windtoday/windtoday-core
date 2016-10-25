'use strict'

const createLogUnmatching = require('./log-unmatching')

function factory (namespace, log) {
  const logUnmatching = createLogUnmatching(namespace, log)

  function createAdd (key, fnValue) {
    function add (acc) {
      const value = fnValue(acc)
      if (value) acc.output[key] = value
      else logUnmatching(key, acc)
    }

    return add
  }

  return createAdd
}

module.exports = factory
