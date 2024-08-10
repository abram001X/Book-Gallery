import { useEffect, useState } from 'react';
import './App.css';
import { BookGallery } from './components/BookGallery.jsx';
import { Menu } from './components/Menu.jsx';
import { Details } from './components/Details.jsx';
const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

function App() {
  const [book, setBook] = useState([]);
  const [books, setBooks] = useState();
  const [bookStorage, setBookStorage] = useState();
  const [drag, setDrag] = useState([]);
  const [infoBooks, setInfoBooks] = useState()
  const [exit, setExit] = useState(false)
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch(URL);
    const data = await res.json();
    setBook(
      data.library.map((data) => ({
        title: data.book.title,
        pages: data.book.pages,
        genre: data.book.genre,
        cover: data.book.cover,
        synopsis: data.book.synopsis,
        year: data.book.year,
        ISBN: data.book.ISBN,
        author: data.book.author,
        bolean: true
      }))
    );
  };
  let bookAvailable = 0;
  let bookNoAvailable = 0;

  //Filtrar libros por paginas
  const pageFilter = (event) => {
    if(bookStorage){
      setBooks(bookStorage.filter((book) => book.pages >= event));
    }
    else{
      setBooks(book.filter((book) => book.pages >= event));
    }
  };

  // Implementar una funcionalidad de búsqueda en la lista de libros disponibles

  const handleSearch = (event) => {
    if(bookStorage){
      setBooks(
      bookStorage.filter((book) =>
        book.title.toLowerCase().startsWith(event.toLowerCase())
      ));
    }else{
      setBooks(
        book.filter((book) =>
          book.title.toLowerCase().startsWith(event.toLowerCase())
        ));
    }
  };
  //Cambiar el localStorage para reflejarlo en otra pestaña al instante
  addEventListener('storage', (e) => {
    if (e.key == 'Books') {
      setBooks(JSON.parse(e.newValue));
    }
    
  });

  //Guardar los valores en localStorage
  useEffect(() => {
    let data = window.localStorage.getItem('Books');
    if (data) {
      
      setBooks(JSON.parse(data))
      setBookStorage(JSON.parse(data))
    }
  }, []);

  useEffect(() => {
    if(bookStorage){
      window.localStorage.setItem('Books', JSON.stringify(bookStorage));
    }
    else {
      window.localStorage.setItem('Books', JSON.stringify(book));
    }
  }, [book,bookStorage]);
  
  //contar cuantos true tienen los libros
  if (bookStorage){
    bookStorage.map((book) => {
    if (book.bolean) {
      bookAvailable++;
    } else {
      bookNoAvailable++;
    }
  })
}
else{
  book.map((books) => {
    if (books.bolean) {
      bookAvailable++;
    } else {
      bookNoAvailable++;
    }
  });
}
  // Detectar cuales libros están disponibles o no para leer
  const bookLearn = (selectedISBN) => {
    if(books){
      setBooks(
      books.map((book) => {
        if (book.ISBN === selectedISBN) {
          return book.bolean
            ? { ...book, bolean: false }
            : { ...book, bolean: true };
        }
        return { ...book };
      }))}
    
    setBook(
        book.map((book) => {
          if (book.ISBN === selectedISBN) {
            return book.bolean
              ? { ...book, bolean: false }
              : { ...book, bolean: true };
          }
          return { ...book };
        })
    );
    setBookStorage(bookStorage? bookStorage.map((book) => {
      if (book.ISBN === selectedISBN) {
        return book.bolean
          ? { ...book, bolean: false }
          : { ...book, bolean: true };
      }
      return { ...book };
    }): book.map((book) => {
      if (book.ISBN === selectedISBN) {
        return book.bolean
          ? { ...book, bolean: false }
          : { ...book, bolean: true };
      }
      return { ...book };
    }))
    
  }
  
  //Filtrar los libros, recorre books y tomar los libros que coincidan con los generos
  const booksFilter = (genre) => {
    if (genre == 'Todos') {
      return setBooks(bookStorage);
    }
    setBooks(book.filter((book) => book.genre === genre));
  };


  // drag and drop function
  const handleDrag = (selectedISBN)=>{
    setDrag(selectedISBN)
  }
  const handleDrop = (selectedISBN)=>{
    setBook(
      book.map((book) => {
        if (book.ISBN === selectedISBN) {
          return { ...book, bolean:false}
        }
        return { ...book };
      })
    );
    setBookStorage(bookStorage ? bookStorage.map((book) => {
        if (book.ISBN === selectedISBN) {
          return { ...book, bolean:false}
        }
        return { ...book };
      }):book.map((book) => {
        if (book.ISBN === selectedISBN) {
          return { ...book, bolean:false}
        }
        return { ...book };
      })
    );
    
    setBooks(
      books.map((book) => {
        if (book.ISBN === selectedISBN) {
          return { ...book, bolean: false }
        }
        return { ...book };
      })
    );
  }
  const activeBook = (boolean,info =null)=>{
    setExit(boolean)
    setInfoBooks(info)
  }
  return (
    <article className="content">
      <Menu
        pageFilter={pageFilter}
        booksFilter={booksFilter}
        bookAvailable={bookAvailable}
        bookNoAvailable={bookNoAvailable}
        handleSearch={handleSearch}
        bookStorage={bookStorage}
        bookLearn={bookLearn}
        drag={drag}
        handleDrop={handleDrop}
      />
      
      {exit ? <Details infoBooks={infoBooks} activeBook={activeBook}/> : null}
      <BookGallery books={books ? books : book} bookLearn={bookLearn} handleDrag={handleDrag} activeBook={activeBook}/>
      <footer className="footer">
        <p>© 2024 AbrahamAlfonzo</p>
        <p>abrahamalfonzo11@gmail.com</p>
      </footer>
    </article>
  );
}
export default App;
