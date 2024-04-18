/* eslint-disable react/prop-types */

import { GoBookmarkFill } from "react-icons/go";
import { GoBookmarkSlashFill } from "react-icons/go";

// eslint-disable-next-line react/prop-types
//Galería de libros

export function BookGallery({ books, bookLearn}) {
  return (
    <div className="cont-gallery">
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
                <p style={{"color" : "#ffff","fontWeight" : "700"}}> {book.title}</p>
                <p >
                  <span>{book.synopsis}</span>
                </p>
                <p className="p_info-book">
                  Autor : <br /> <span>{book.author.name}</span>
                </p>
              </article>
            </div>
          );
        })}
      </section>
    </div>
  );
}
