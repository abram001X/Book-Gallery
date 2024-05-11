const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const fs = require('node:fs')
const port = process.env.PORT || 3000
const api = path.join(__dirname, 'json', 'books.json')

app.use(cors())

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
app.listen(port)
console.log('Port http://localhost:3000')
