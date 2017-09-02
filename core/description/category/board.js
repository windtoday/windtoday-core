'use strict'

const sizeUnit = {
  sail: 'metres',
  board: 'litres'
}

const categorySurface = {
  sail: 'of surface',
  board: 'of shape'
}

const firstSentence = ({ category, brand, model, year }) => {
  const beginning = `This ${model || 'product'} is a windsurfing ${category}`
  const development = brand ? ` designed by ${brand}` : ''
  const end = year ? ` created in ${year}` : ''
  const preend = development !== '' ? ' and' : ''

  return `${beginning}${development}${preend}${end}.`
}

const secondSentence = ({
  condition,
  category,
  modality,
  boardSize,
  sailSize
}) => {
  const beginning =
    condition === 'New' ? `It's a completely new` : `It's an used`

  const development = modality
    ? ` ${modality.toLowerCase()} oriented ${category}`
    : ` ${category}`

  const end = (() => {
    if (!boardSize && !sailSize) return ''
    const size = boardSize || sailSize
    const unit = sizeUnit[category]
    const surface = categorySurface[category]
    return `, with a total of ${size} ${unit} ${surface}`
  })()

  return `${beginning}${development}${end}.`
}

const create = category => doc => {
  const {
    year,
    model,
    brand,
    modality,
    condition,
    'board size': boardSize,
    'sail size': sailSize
  } = doc
  const description = []

  description.push(firstSentence({ category, brand, model, year }))
  description.push(
    secondSentence({ condition, category, modality, boardSize, sailSize })
  )
  return description.join(' ')
}

module.exports = create('board')
module.exports.create = create
