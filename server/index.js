import express from 'express'
import cors from 'cors'
import path from 'path'
import { PORT, FRONTEND_URL } from './config.js'
import dotenv from 'dotenv'
import { createClient } from '@libsql/client'
const app = express()
const api = path.join(process.cwd(), 'json', 'books.json')

app.use(
  cors({
    origin: FRONTEND_URL
  })
)
dotenv.config()

const db = await createClient({
  url: process.env.DB_URL,
  authToken: process.env.DB_TOKEN
})

const result = await db.execute(`SELECT title,genre,cover,pages,synopsis,year,ISBN,author_name as author, group_concat(book_title)as other_book FROM other_books ob
INNER JOIN authors au, books b ON au.author_id = ob.author_id AND b.author_id = ob.author_id
GROUP BY ob.author_id;`)
const resultDb = await db.execute(`SELECT author_name AS name, group_concat(book_title)as other_book FROM other_books ob
INNER JOIN authors au ON au.author_id = ob.author_id 
GROUP BY ob.author_id;`)

const result2 = resultDb.rows.map((data) => {
  return {
    name: data.name,
    otherBooks: data.other_book ? data.other_book.split(',') : []
  }
})

const resultJson = {
  library: result.rows.map((element, j) => ({
    book: {
      title: element.title,
      pages: element.pages,
      genre: element.genre,
      cover: element.cover,
      synopsis: element.synopsis,
      year: element.year,
      ISBN: element.ISBN,
      author: result2[j]
    }
  }))
}
// console.log(resultJson)

// console.log(result.rows)

app.get('/', (req, res) => {
  res.send(resultJson)
})

console.log(api)
app.listen(PORT)
console.log('Port http://localhost:3000')
