import { useRef, useState } from "react";
import "./App.css";
import result from "./books.json";
import { BookGallery } from "./components/BookGallery";
import { Menu } from "./components/Menu";

function App() {
  const book = result.library.map((data) => ({ ...data.book, bolean: true }));
  const [books, setBooks] = useState(book);
  const [booksSave, setBooksSave] = useState(book); //book seguro

  
  let countBookGenre = 0;
  let bookAvailable = 0;
  let bookNoAvailable = 0;

//Guardar los valores en localStorage



//contar cuantos true tienen los libros
  booksSave.map((book) => {
    if (book.bolean) {
      bookAvailable++;
    } else {
      bookNoAvailable++;
    }
  });

  books.map(()=> {
      countBookGenre++;
  });

  // Detectar cuales libros están disponibles o no para leer
  const bookLearn = (selectedISBN) => {
    setBooksSave(
      booksSave.map((book) => {
        if (book.ISBN === selectedISBN) {
          return book.bolean
            ? { ...book, bolean: false }
            : { ...book, bolean: true };
        }
        return { ...book };
      })
    );

    setBooks(
      books.map((book) => {
        if (book.ISBN === selectedISBN) {
          return book.bolean
            ? { ...book, bolean: false }
            : { ...book, bolean: true };
        }
        return { ...book };
      })
    );
  };


  //Filtrar los libros, recorre books y tomar los libros que coincidan con los generos
  const booksFilter = (genre) => {
    const books2 = booksSave;

    if (genre == "Todos") {
      return setBooks(books2);
    }

    setBooks(books2.filter((book) => book.genre == genre));
  };

  return (
    <div className="content">
      <Menu
        books={books}
        booksFilter={booksFilter}
        bookAvailable={bookAvailable}
        bookNoAvailable={bookNoAvailable}
        countBookGenre={countBookGenre}
      />
      <BookGallery books={books} bookLearn={bookLearn} />
    </div>
  );
}

export default App;
