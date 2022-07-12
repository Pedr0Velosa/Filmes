import {useContext} from "react";
import {Link} from "react-router-dom";
import ThemeContext from "./ThemeContext";

const Filme = ({movies, showMore}) => {
  const imagesAPI = "https://image.tmdb.org/t/p/original/";

  const theme = useContext(ThemeContext);

  return !movies.length ? (
    <h2>Nenhum filme encontrado</h2>
  ) : (
    movies.map((movie, i) => (
      i < showMore ? (
        <div key={movie.id} className="filme-box" id={movie.id} data-theme={theme}>
          <Link to={`/overview/${movie.id}`}>
            <img
              src={`${imagesAPI}${movie.poster_path}`}
              alt={"poster do filme"}
            />
            <div className="filme-info">
              <h2>{movie.title}</h2>
              <h3>{movie.vote_average}</h3>
            </div>
          </Link>
        </div>
      ) : null
    ))
  );
};

export default Filme;
