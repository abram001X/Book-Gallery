//Menú de filtrados, categorias etc
import { IoBookOutline } from "react-icons/io5";
import { useState } from "react";
import { IoMoonOutline } from "react-icons/io5";
import { LuBookDown } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa6";
// eslint-disable-next-line react/prop-types
export function Menu({
  pageFilter,
  booksFilter,
  bookAvailable,
  bookNoAvailable,
  handleSearch,
}) {
  const [pages, setPages] = useState();
  const pagesPar = (event) => {
    setPages(event);
  };
  return (
    <div className="menu">
      <h1>BookGallery</h1>
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
          <IoBookOutline className="icon" />{" "}
          <label htmlFor="" style={{ color: "#fff" }}>
            Filtrar por páginas{" "}
          </label>
          <input
            type="range"
            min="43"
            max="1200"
            onChange={(e) => {
              pageFilter(e.target.value);
              pagesPar(e.target.value);
            }}
            style={{ width: "100px", marginTop: "10px", marginRight: "10px" }}
          />{" "}
          <label htmlFor="" style={{ fontSize: "14px", color: "#999" }}>
            {" "}
            {pages}{" "}
          </label>
        </section>
        <section className="cont-select-menu">
          <p>
            <IoMoonOutline className="icon" /> Elige un género :{" "}
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
          <p>
            <LuBookDown className="icon" /> Libros <br />
            disponibles : <span>{bookAvailable}</span>
          </p>
          <p>
            <FaRegStar className="icon" /> Libros leídos :{" "}
            <span>{bookNoAvailable}</span>
          </p>
        </section>
      </div>
    </div>
  );
}
