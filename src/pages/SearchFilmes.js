import {useEffect, useState} from "react";
import Results from "../components/Results";

const SearchFilmes = ({language}) => {
  const [ movies, setMovies ] = useState([]);
  const [ pageID, setPageID ] = useState(1);
  const [ findMovies, updateFindMovies ] = useState([]);
  const [ showMovies, updateShowMovies ] = useState([]);

  const [ showMore, setShowMore ] = useState(10);

  useEffect(() => {
    const requestMovies = async () => {

      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=2a1a83bf490a5e86d3a9599e93b68d28&language=${language}&page=${pageID}`
      );

      const json = await res.json();

      setMovies(json.results);
      updateShowMovies(json.results);
    };
    requestMovies();
  }, [ language, pageID ]);

  useEffect(() => {
    let arr = [];

    const searchMovies = (arr) => {
      if (!findMovies.length) return updateShowMovies(movies);
      movies.map((movie) => {
        movie.title.toLowerCase().includes(findMovies.toLowerCase())
          ? arr.push(movie)
          : null;
      });

      return updateShowMovies(arr);
    };
    searchMovies(arr);

  }, [ findMovies, movies ]);

  const toggleExibir = () => {
    if (showMore === 20) return setShowMore(showMore - 10);
    return setShowMore(showMore + 10);
  };
  return (
    <>
      <input
        value={findMovies}
        placeholder={
          language === 'en-us' ? ('Search...') :
            (
              language === 'pt-br' ? ('Procurar...') :
                (
                  language === 'pt' ? ('Procurar...') : (
                    language === 'uk' ? ('Procurar em ucraniano...') : null
                  )
                )
            )
        }
        onChange={(e) => {
          updateFindMovies(e.target.value);
        }}
      />
      <Results movies={showMovies} showMore={showMore} />
      {showMore === 10 ? (
        <button value={showMore} onClick={toggleExibir}>Exiba Mais</button>
      ) : <button value={showMore} onClick={toggleExibir}>Exiba Menos</button>
      }
    </>
  );
};

export default SearchFilmes;
