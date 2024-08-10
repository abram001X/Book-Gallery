/* eslint-disable react/prop-types */
import { GoBookmarkFill } from 'react-icons/go';
import { GoBookmarkSlashFill } from 'react-icons/go';

// eslint-disable-next-line react/prop-types
//Galería de libros

export function BookGallery({ books, bookLearn, handleDrag, activeBook }) {
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
              <div className="img-grid-item">
                <img
                  className='img-gallery'
                  src={book.cover}
                  alt={book.title}
                  onDragStart={() => {
                    handleDrag(book.ISBN);
                  }}
                  onClick={() => {
                    activeBook(true, book);
                  }}
                />
              </div>

              <article className="info-book">
                <div className="title-info">
                  <p style={{ color: '#ffff', fontWeight: '700' }}>
                    {' '}
                    {book.title}
                  </p>
                  <p>
                    <span>{book.synopsis}</span>
                  </p>
                </div>

                <p className="p_autor">
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
