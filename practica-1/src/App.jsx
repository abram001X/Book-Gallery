import { useRef, useState } from "react";
import "./App.css";
import result from "./books.json";
import { BookGallery } from "./components/BookGallery";
import { Menu } from "./components/Menu";
 // Crear galeria de libros


function App() {
  const book = result.library.map((data) => ({ ...data.book, bolean: true }));
  const [books, setBooks] = useState(book);
  //book seguro 
  const  [booksSave,setBooksSave] = useState(book);
  const counter = useRef(0);
  
  booksSave.map(book=>{
    if(book.bolean){
      counter.current++
    }
  })

  // Detectar cuales libros están disponibles o no para leer
  const bookLearn = (selectedISBN) => {

    
    setBooksSave(booksSave.map( book=>{
      if (book.ISBN === selectedISBN) {
        return book.bolean
          ? { ...book, bolean: false }
          : { ...book, bolean: true };
      }
      return { ...book };
    }))

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
    console.log(counter)
  };

  //Filtrar los libros, recorre books y tomar los libros que coincidan con los generos
  
  const booksFilter = genre =>{
    const books2 = booksSave;
    if(genre == "Todos"){
      return setBooks(books2)
    }

    return setBooks(books2.filter(book => book.genre == genre))
   
  }

 return ( 
  <div className="content">
    <Menu books={books} booksFilter={booksFilter}/>
    <BookGallery books={books} bookLearn={bookLearn}/>
    
  </div>)
}

export default App;
