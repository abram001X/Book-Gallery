import { useEffect, useState } from 'react';
import './App.css';
import result from './books.json';
import { BookGallery } from './components/BookGallery.jsx';
import { Menu } from './components/Menu.jsx';

const URI = 'http://localhost:3000'

function App() {
  const [book, setBook] = useState(result.library.map((data) => ({
    title: data.book.title,
    pages: data.book.pages,
    genre: data.book.genre,
    cover: data.book.cover,
    synopsis: data.book.synopsis,
    year: data.book.year,
    ISBN: data.book.ISBN,
    author: data.book.author,
    bolean: true
  })))
  const [books, setBooks] = useState(book);
  let bookAvailable = 0;
  let bookNoAvailable = 0;

  //Filtrar libros por paginas
  const pageFilter = (event) => {
    setBooks(book.filter((book) => book.pages >= event));
  };

  // Implementar una funcionalidad de búsqueda en la lista de libros disponibles

  const handleSearch = (event) => {
    setBooks(
      book.filter((book) =>
        book.title.toLowerCase().startsWith(event.toLowerCase())
      )
    );
  };
  //Cambiar el localStorage para reflejarlo en otra pestaña al instante
  addEventListener('storage', (e) => {
    if (e.key == 'Books') {
      setBook(JSON.parse(e.newValue));
      setBooks(JSON.parse(e.newValue));
    }
  });

  //Guardar los valores en localStorage
  useEffect(() => {
    let data = window.localStorage.getItem('Books');
    if (data) {
      setBook(JSON.parse(data)), setBooks(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('Books', JSON.stringify(book));
  }, [book]);

  //contar cuantos true tienen los libros
  books.map((book) => {
    if (book.bolean) {
      bookAvailable++;
    } else {
      bookNoAvailable++;
    }
  });
  // Detectar cuales libros están disponibles o no para leer
  const bookLearn = (selectedISBN) => {
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
    console.log(genre);
    if (genre == 'Todos') {
      return setBooks(book);
    }
    setBooks(book.filter((book) => book.genre === genre));
  };

  return (
    <div className="content">
      <Menu
        pageFilter={pageFilter}
        booksFilter={booksFilter}
        bookAvailable={bookAvailable}
        bookNoAvailable={bookNoAvailable}
        handleSearch={handleSearch}
        books={books}
        bookLearn={bookLearn}
      />

      <BookGallery books={books} bookLearn={bookLearn} />
      <footer className="footer">
        <p>© 2024 AbrahamAlfonzo</p>
        <p>abrahamalfonzo11@gmail.com</p>
      </footer>
    </div>
  );
}

export default App;
