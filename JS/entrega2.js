// Seleccionamos los input del HTML

const inputTitle = document.getElementById("inputTitle");
const inputPoints = document.getElementById("inputPoints");
const inputReview = document.getElementById("inputReview");

let peliculas = JSON.parse(localStorage.getItem("misPeliculas")) || [];
mostrarPeliculas(); // Trabajamos con el local storage, en caso de que todavia no este creado toma un array vacio

function mostrarPeliculas() {
  const movieListContainer = document.getElementById("movieList");
  movieListContainer.innerHTML = "";
  peliculas.forEach((pelicula, i) => {
    const peliculaCard = document.createElement("div");
    peliculaCard.className = "peliculas-card";
    const titulo = document.createElement("h3");
    titulo.textContent = pelicula.titulo;
    const puntaje = document.createElement("p");
    puntaje.innerHTML = `<strong>Puntaje: </strong> ${pelicula.puntaje}`;
    const resena = document.createElement("p");
    resena.innerHTML = `<strong>Reseña: </strong> ${pelicula.resena}`;
    const borrarResena = document.createElement("button");
    borrarResena.addEventListener("click", () => {
      peliculas.splice(i, 1);
      localStorage.setItem("misPeliculas", JSON.stringify(peliculas));
      mostrarPeliculas();
    });
    borrarResena.className = "btn";
    borrarResena.textContent = "X";
    peliculaCard.appendChild(titulo);
    peliculaCard.appendChild(puntaje);
    peliculaCard.appendChild(resena);
    peliculaCard.appendChild(borrarResena);

    movieListContainer.appendChild(peliculaCard);
  });
}

const agregarPelicula = () => {
  let pelicula = {
    titulo: inputTitle.value,
    puntaje: inputPoints.value,
    resena: inputReview.value,
  };
  peliculas.push(pelicula);
  localStorage.setItem("misPeliculas", JSON.stringify(peliculas)); //  Guardamos en localStorage
  mostrarPeliculas();

  // Resetamos los campos del formulario para que sea mas comodo agregar una proxima pelicula
  inputTitle.value = "";
  inputPoints.value = "";
  inputReview.value = "";
};

let btnAddMovie = document.getElementById("btnAddMovie");
btnAddMovie.addEventListener("click", agregarPelicula);
