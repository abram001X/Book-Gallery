/* eslint-disable react/prop-types */
//Menú de filtrados, categorias etc
import { IoBookOutline } from 'react-icons/io5';
import { useState } from 'react';
import { IoMoonOutline } from 'react-icons/io5';
import { LuBookDown } from 'react-icons/lu';
import { FaRegStar } from 'react-icons/fa6';
import { BsJournalBookmark } from 'react-icons/bs';
// eslint-disable-next-line react/prop-types
export function Menu({
  pageFilter,
  booksFilter,
  bookAvailable,
  bookNoAvailable,
  handleSearch,
  books,
  bookLearn,
  drag,
  handleDrop
}) {
  const [pages, setPages] = useState();
  const pagesPar = (event) => {
    setPages(event);
  };
  const [styleDrag, setStyleDrag] = useState(false);

  return (
    <div className="menu">
      <h1>
        <BsJournalBookmark
          className="icon"
          style={{ color: '#0090ff', transform: 'translateY(3px)' }}
        /> BookGallery
      </h1>
      <div className="cont-filter">
        <input
          className="search"
          type="search"
          placeholder="🔍 Búscar Libro"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
        <section className="cont-labels">
          <IoBookOutline className="icon" />{' '}
          <label style={{ color: '#fff' }}>Filtrar por páginas </label>
          <input
            type="range"
            min="43"
            max="1200"
            onChange={(e) => {
              pageFilter(e.target.value);
              pagesPar(e.target.value);
            }}
            style={{ width: '70%', marginTop: '20px' }}
          />{' '}
          <label style={{ fontSize: '14px', color: '#999' }}> {pages} </label>
        </section>
        <section className="cont-select-menu">
          <p>
            <IoMoonOutline className="icon" /> Elige un género {' '}
          </p>
          <select
            name="Géneros"
            id=""
            onChange={(e) => booksFilter(e.target.value)}
            className="select"
          >
            <option value="Todos">Todos</option>
            <option value="Fantasía">Fantasía</option>
            <option value="Ciencia ficción">Ciencia ficción</option>
            <option value="Terror">Terror</option>
            <option value="Zombies">Zombies</option>
          </select>
          <br />
          <p>
            <LuBookDown className="icon" /> Libros
            disponibles : <span>{bookAvailable}</span>
          </p>
        </section>
      </div>
      <p className="libros-leidos">
        <FaRegStar className="icon" /> Libros leídos :{' '}
        <span>{bookNoAvailable}</span>
      </p>
      <br />
      <b className="b-menu">(Arrastra un libro)</b>
      <br />
      <div
        className={`book-read ${styleDrag ? 'active-drag' : ''}`}
        onDragOver={(e) => {
          e.preventDefault();
          setStyleDrag(true);
        }}
        onDrop={() => {
          handleDrop(drag);
          setStyleDrag(false)
        }}
        onDragLeave={()=>setStyleDrag(false)}
      >
        {books.map((book) => {
          return book.bolean ? null : (
            <img
              src={book.cover}
              onClick={() => bookLearn(book.ISBN)}
              key={book.ISBN}
            />
          );
        })}
      </div>
    </div>
  );
}
