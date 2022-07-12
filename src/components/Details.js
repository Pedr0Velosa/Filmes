import {useContext, useState} from "react";
import Modal from "./Modal";
import ThemeContext from "./ThemeContext";

const Details = ({details, credits, imagesAPI}) => {

  const [ showModal, setShowModal ] = useState(false);
  const theme = useContext(ThemeContext);

  function changeRunTime(runtime) {
    let runTimeMinutes = runtime % 60;
    let runTimeHours = (runtime - runTimeMinutes) / 60;
    let runtimeFormated = `${runTimeHours}h ${runTimeMinutes}m`;
    return runtimeFormated;
  }

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <div className="overview-container" data-theme={theme}>
      {
        showModal ? (
          <Modal>
            <div>
              <button
                onKeyDown={e => e.key === 'Enter' ? toggleModal() : null}
                onClick={toggleModal}>&#10006;</button>
              <img
                src={`${imagesAPI}${details.poster_path}`}
                alt={`poster do filme${details.title}`}
              />
            </div>
          </Modal>
        ) : null
      }
      <div className="poster-container">
        <div className="poster">
          <img
            src={`${imagesAPI}${details.poster_path}`}
            alt={`poster do filme${details.title}`}
          />
          <button
            onClick={toggleModal}
            tabIndex={0}
          ></button>
        </div>
        <div className="homepage">
          <a
            href={details.homepage}
            target='_blank'
            rel="noreferrer"
          >Acesse o Site Oficial</a>
        </div>
      </div>
      <div className="info-box">
        <div className="info-title">
          <h2>{details.title} <span className="light-blue">({details.release_date.slice(0, 4)})</span></h2>
          <div className="info-details">
            <h3>{new Date(details.release_date).toLocaleDateString()}</h3>
            <ul datatype="list">
              {details.genres.map((genre) => (
                <li key={genre.id}>{genre.name},</li>
              ))}
              <li>{changeRunTime(details.runtime)}</li>
            </ul>
          </div>
        </div>
        <div className="user-score-box">
          <div className="user-score">
            <svg width="68" height="68">
              <circle
                cx="34"
                cy="34"
                r="30"
                stroke="#21d07a"
                strokeWidth="5"
                strokeDashoffset={100 - (details.vote_average * 10 / 185 * 100)}
                strokeDasharray={185}
                strokeLinecap='round'
                fill="transparent"
              />
            </svg>
            <div className="percent">
              <p>{details.vote_average * 10}</p>
              <span>%</span>
            </div>
          </div>
          <p>User <span>Score</span></p>
        </div>
        <span className="light-blue">{details.tagline}</span>
        <h3>Overview</h3>
        <p>{details.overview}</p>
        <div className="credits">
          {
            credits.cast.filter(credit =>
            (
              credit.known_for_department.includes('Writting') ||
              credit.known_for_department.includes('Sound') ||
              credit.known_for_department.includes('Directing') ||
              credit.known_for_department.includes('Production')
            )
            ).map(filteredDepartment => (
              <div className="cast" key={filteredDepartment.id}>
                <h3>{filteredDepartment.name}</h3>
                <h4>{filteredDepartment.known_for_department}</h4>
              </div>
            ))
          }
        </div>
      </div>
    </div >
  );
};

export default Details;