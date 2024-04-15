/* eslint-disable react/prop-types */
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import { BsFillBookmarkXFill } from "react-icons/bs";

// eslint-disable-next-line react/prop-types
//Galería de libros

export function BookGallery({ books, bookLearn }) {
  return (
    <section className="cont-grid">
      {books.map((book) => {
        return (
          <div className="cont-books" key={book.ISBN}>
            {book.bolean ? (
              <BsFillBookmarkPlusFill
                onClick={() => bookLearn(book.ISBN)}
                className="cono"
              />
            ) : (
              <BsFillBookmarkXFill
                onClick={() => bookLearn(book.ISBN)}
                className="cono"
              />
            )}
            <img src={book.cover} className="img-grid-item" alt={book.title} />
            <article className="info-book">
              <p>
                Title : <span style={{ color: "#888" }}>{book.title}</span>
              </p>
            </article>
          </div>
        );
      })}
    </section>
  );
}
