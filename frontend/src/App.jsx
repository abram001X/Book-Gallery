import { useEffect, useState } from 'react';
import './App.css';
import { BookGallery } from './components/BookGallery.jsx';
import { Menu } from './components/Menu.jsx';
import { Details } from './components/Details.jsx';
const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

function App() {
  const [book, setBook] = useState([]);
  const [books, setBooks] = useState();
  const [drag, setDrag] = useState([]);
  const [infoBooks, setInfoBooks] = useState()
  const [exit, setExit] = useState(false)
  const [bookFilter, setBookFilter] = useState()
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
    setBooks(bookFilter.filter((book) => book.pages >= event));
  };

  // Implementar una funcionalidad de búsqueda en la lista de libros disponibles

  const handleSearch = (event) => {
    setBooks(
      bookFilter.filter((book) =>
        book.title.toLowerCase().startsWith(event.toLowerCase())
      )
    );
  };
  //Cambiar el localStorage para reflejarlo en otra pestaña al instante
  addEventListener('storage', (e) => {
    if (e.key == 'Books') {
      setBooks(JSON.parse(e.newValue));
    }
    if(e.key == 'Book'){
      setBookFilter(JSON.parse(e.newValue))
    }
    
  });

  //Guardar los valores en localStorage
  useEffect(() => {
    let data = window.localStorage.getItem('Books');
    let dataFilter = window.localStorage.getItem('Book')
    if (data) {
       setBooks(JSON.parse(data));
       setBook(JSON.parse(data))
    }
    if(dataFilter){
      setBookFilter(JSON.parse(dataFilter))
    }
  }, []);

  useEffect(() => {
    if(bookFilter){
      window.localStorage.setItem('Book',JSON.stringify(bookFilter))
    }
    if(books){
      window.localStorage.setItem('Books', JSON.stringify(books));
    }
    else {
      window.localStorage.setItem('Books', JSON.stringify(book));
    }
  }, [book,books,bookFilter]);
  
  //contar cuantos true tienen los libros
  if (books){
    books.map((book) => {
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
      })
    );
    
    setBookFilter(
      books.map((book) => {
        if (book.ISBN === selectedISBN) {
          return book.bolean
            ? { ...book, bolean: false }
            : { ...book, bolean: true };
        }
        return { ...book };
      })
    );
    }
    
      setBook(
        book.map((books) => {
          if (books.ISBN === selectedISBN) {
            return books.bolean
              ? { ...books, bolean: false }
              : { ...books, bolean: true };
          }
          return { ...books };
        })
      );
    if(!books){setBookFilter(
      book.map((books) => {
        if (books.ISBN === selectedISBN) {
          return books.bolean
            ? { ...books, bolean: false }
            : { ...books, bolean: true };
        }
        return { ...books };
      })
    );}
    
  };
  
  //Filtrar los libros, recorre books y tomar los libros que coincidan con los generos
  const booksFilter = (genre) => {
    if (genre == 'Todos') {
      return setBooks(bookFilter);
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
    setBookFilter(
      bookFilter.map((book) => {
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
        bookFilter={bookFilter}
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
