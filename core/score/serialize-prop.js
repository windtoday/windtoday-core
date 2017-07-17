module.exports = (acc, prop, serializedProp) => (
  prop ? `.${serializedProp || prop}` : ''
)
