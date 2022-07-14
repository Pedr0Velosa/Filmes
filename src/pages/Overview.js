import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import Details from "../components/Details";

const Overview = ({language}) => {
  const props = useParams();

  const [ details, setDetails ] = useState();
  const [ credits, setCredits ] = useState();
  const imagesAPI = "https://image.tmdb.org/t/p/original/";


  useEffect(() => {
    async function requestDetails() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${props.id}?api_key=2a1a83bf490a5e86d3a9599e93b68d28&language=${language}`
      );
      const json = await res.json();
      setDetails(json);
    }

    async function requestCredits() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${props.id}/credits?api_key=2a1a83bf490a5e86d3a9599e93b68d28&language=${language}`
      );
      const json = await res.json();
      setCredits(json);
    }
    requestDetails();
    requestCredits();
  }, [ language, props.id ]);


  return !details || !credits ? null : (
    <Details details={details} credits={credits} imagesAPI={imagesAPI} />
  );
};
export default Overview;
