const express = require('express')
const Pizza = require('./helpers')

const router = express.Router()

router.post('/order', async (req, res) => {
  const { status, data } = await Pizza.postPizza(req.body)
  res.status(status).json(data)
})

router.get('/history', (req, res) => {
  const { status, data } = Pizza.getHistory()
  res.status(status).json(data)
})

module.exports = router
