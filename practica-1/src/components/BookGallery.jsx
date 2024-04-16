/* eslint-disable react/prop-types */
import { useState } from "react";
import { GoBookmarkFill } from "react-icons/go";
import { GoBookmarkSlashFill } from "react-icons/go";

// eslint-disable-next-line react/prop-types
//Galería de libros

export function BookGallery({
  books,
  bookLearn,
  countBookGenre,
  bookSynopsis,
}) {
  const [hovered, setHovered] = useState(false);



  
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
            <div
              onMouseEnter={() => {
                setHovered(true);
              }}
              onMouseLeave={() => {
                setHovered(false);
              }}
              className="cont-books"
              key={book.ISBN}
            >
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
                onClick={() => {
                  bookSynopsis(book.synopsis);
                }}
              />

              <article className="info-book">
                <p>{book.title}</p>
                <p className={hovered ? "info-books-hover" : "info-books"}>
                  Sinopsis : <br /> <span>{book.synopsis}</span>
                </p>
                <p className={hovered ? "info-books-hover" : "info-books"}>
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
