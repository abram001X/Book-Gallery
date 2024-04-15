//Menú de filtrados, categorias etc

// eslint-disable-next-line react/prop-types
export function Menu({ booksFilter, bookAvailable, bookNoAvailable, countBookGenre }) {

  return (
    <menu className="menu">
      <h1>BookGallery</h1>
      <div className="cont-filter">
        <select
          name="Géneros"
          id=""
          onChange={(e) => booksFilter(e.target.value)}
        >
          <option value="Todos">Todos</option>
          <option value="Fantasía">Fantasía</option>
          <option value="Ciencia ficción">Ciencia ficción</option>
          <option value="Terror">Terror</option>
          <option value="Zombies">Zombies</option>
        </select>
        <p>Libros disponibles : {bookAvailable}</p>
         <p>Libros en lista de leídos :{bookNoAvailable}</p>
         <p>Libros de este genero : {countBookGenre} </p>

      </div>
    </menu>
  );
}
