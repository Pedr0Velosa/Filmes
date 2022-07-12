import Filme from "./Filme";

const Results = ({movies, showMore}) => {


  return (
    <div className="filme-container">
      <Filme movies={movies} showMore={showMore} />
    </div>
  );
};

export default Results;
