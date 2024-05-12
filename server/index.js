const express = require('express')
const path = require('path')
const fs = require('node:fs')
const app = express()
const port = process.env.PORT || 3000
const library = path.join(__dirname, 'json', 'books.json')

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*'])
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  // res.append('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.get('/', (req, res) => {
  fs.readFile(library, 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return res.status(500).send('Error al leer el archivo JSON')
    }
    const jsonData = JSON.parse(data)
    res.send(jsonData)
  })
})

app.listen(port)
console.log(`Port on http://localhost:${port}`)
console.log(library)
