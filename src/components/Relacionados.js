import {useEffect, useState} from "react";
import Filme from "./Filme";
const Relacionados = ({id}) => {

  const [ recomendados, setRecomendados ] = useState([]);
  const [ translateX, setTranslateX ] = useState({translate: 0});
  const css = {
    transform: `translateX(${translateX.translate}%)`
  };

  useEffect(() => {
    const requestRecomendados = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=2a1a83bf490a5e86d3a9599e93b68d28&language=en-US&page=1`
      );
      const json = await res.json();
      setRecomendados(json.results);
    };
    requestRecomendados();
  }, [ id ]);

  const translate = (val) => {
    setTranslateX(prevState => ({...prevState, translate: prevState.translate + val}));
  };

  console.log(translateX);
  return (
    <div className="recomendados">
      <h3>Recomendados</h3>
      <div className="carrousel">
        <button
          className="arrow arrow-prev"
          onClick={() => translate(100)}
        >{'<'}</button>
        <div className="filme-container" style={css}>
          <Filme showMore={20} movies={recomendados} />
        </div>
        <button
          className="arrow arrow-next"
          onClick={() => translate(-100)}
        >{'>'}</button>
      </div>
    </div>
  );
};

export default Relacionados;