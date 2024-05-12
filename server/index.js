const express = require('express')
<<<<<<< HEAD
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
=======
const cors = require('cors')
const path = require('path')
const app = express()
const fs = require('node:fs')
const port = process.env.PORT || 3000
const api = path.join(__dirname, 'json', 'books.json')
>>>>>>> 843267e0d6067b05160ecc9f9e8b6fd18c505fcc

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
<<<<<<< HEAD
console.log(`Port on http://localhost:${port}`)
console.log(library)
=======
console.log('Port http://localhost:3000')
>>>>>>> 843267e0d6067b05160ecc9f9e8b6fd18c505fcc
