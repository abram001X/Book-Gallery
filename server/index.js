import express  from 'express'
import cors from 'cors' 
import path  from 'path'
import { PORT, FRONTEND_URL } from './config.js'
import fs from 'node:fs'
const app = express()
const api = path.join(process.cwd(), 'json', "books.json")

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
