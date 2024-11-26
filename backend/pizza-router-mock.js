const Pizza = require('./helpers')
const { setupServer } = require('msw/node')
const { http, HttpResponse, delay } = require('msw')

async function order({ request }) {
  await delay(10)
  const { data, status } = await Pizza.postPizza(await request.json())
  const response = new HttpResponse(JSON.stringify(data), {
    status, headers: { 'Content-Type': 'application/json' },
  })
  return response
}

async function history({ request }) {
  await delay(10)
  const { data } = Pizza.getHistory()
  return HttpResponse.json(data)
}

const handlers = [
  http.post('http://localhost:9009/api/pizza/order', order),
  http.get('http://localhost:9009/api/pizza/history', history),
]

module.exports = setupServer(...handlers)
