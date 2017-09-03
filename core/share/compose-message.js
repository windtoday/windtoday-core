'use strict'

const WEBSITE_URL = 'https://windtoday.co'

module.exports = ({ title, price, objectID }) => {
  const link = `${WEBSITE_URL}/item?id=${objectID}`
  return `💨 ${title} €${price} 👉 ${link}`
}
