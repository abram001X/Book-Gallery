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
  handleHover,
}) {
  
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
                onMouseEnter={() => {
                handleHover(book.ISBN);
              }}
              onMouseLeave={() => {
                handleHover(book.ISBN);
              }}
    
                
              />

              <article className="info-book">
                <p>{book.title}</p>
                <p className={book.hover ? "info-books-hover" : "info-books"}>
                  Sinopsis : <br /> <span>{book.synopsis}</span>
                </p>
                <p className={book.hover ? "info-books-hover" : "info-books"}>
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
