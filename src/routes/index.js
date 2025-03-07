const { historyRoute } = require('./history.route')
const { plateRoute } = require('./plate.route')
const { predictRoute } = require('./predict.route')
const { slotRoute } = require('./slot.route')

const _routes = [
  ['/', predictRoute],
  ['/history', historyRoute],
  ['/plate', plateRoute],
  ['/slot', slotRoute]
]

const routes = (app) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}

module.exports = { routes }
