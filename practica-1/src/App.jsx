import { useRef, useState } from "react";
import "./App.css";
import result from "./books.json";

function App() {
  const book = result.library.map((data) => ({...data.book, bolean: true }));
  const [books, setBooks] = useState(book);
  console.log(book)
  // Detectar cuales libros están disponibles o no para leer
  const bookLearn = (selectedISBN) => {
    setBooks(books.map(book => {
      if (book.ISBN === selectedISBN) {
        return {...book, bolean: false };
      }
      return book;
    }));
  }

  // Crear galeria de libros
  function BookGallery() {
    return <section className="cont-grid">
    {books.map((book) => {
      return (
          <div className="cont-books" key={book.ISBN}>
            <img src={book.cover} className="grid-item" alt={book.title} />
            <article className="info-book">
              <button onClick={() => bookLearn(book.ISBN)}>{book.bolean ? "Leer" : "Leído"}</button>
            </article>
          </div>
      );
    })}
    </section>
  }

  return <div className="content">{BookGallery()}</div>;
}

export default App;