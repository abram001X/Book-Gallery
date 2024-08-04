const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const fs = require('node:fs')
const PORT = require('./config')
const FRONTEND_URL = require('./config')
const api = path.join(__dirname, 'json', 'books.json')

app.use(
  cors({
    origin: FRONTEND_URL
  })
)

app.get('/', (req, res) => {
  fs.readFile(api, 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return res.status(500).send('error al leer el json')
    }
    const apiData = JSON.parse(data)
    res.send(apiData)
  })
})

console.log(api)
app.listen(PORT)
console.log('Port http://localhost:3000')
