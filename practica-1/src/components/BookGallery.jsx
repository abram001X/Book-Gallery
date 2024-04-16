/* eslint-disable react/prop-types */
import { GoBookmarkFill } from "react-icons/go";  
import { GoBookmarkSlashFill } from "react-icons/go";

// eslint-disable-next-line react/prop-types
//Galería de libros

export function BookGallery({ books, bookLearn, countBookGenre }) {
  return (
    <div className="cont-gallery">
      <p
        className="libros-disponibles"
        style={{ width: "100%", color: "#fff" }}
      >
        Libros : <span>{countBookGenre}</span>
      </p>
      <section className="cont-grid">
        {books.map((book) => {
          return (
            <div className="cont-books" key={book.ISBN}>
              {book.bolean ? (
                <GoBookmarkFill 
                  onClick={() => bookLearn(book.ISBN)}
                  className="cono"
                />
              ) : (
                <GoBookmarkSlashFill 
                  onClick={() => bookLearn(book.ISBN)}
                  className="cono"
                />
              )}
              <img
                src={book.cover}
                className="img-grid-item"
                alt={book.title}
              />
              <article className="info-book">
                <p>
                  Title : <span style={{ color: "#888" }}>{book.title}</span>
                </p>
              </article>
            </div>
          );
        })}
      </section>
    </div>
  );
}
