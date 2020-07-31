import React, { useState, useEffect } from 'react';
import { useMovieId } from '../../Context/ContextProvider';
import './styles.css';
import { useHistory } from 'react-router-dom';
import { api, apiKey, imgUrl } from '../../services/api';

function Details() {
  const { movieId } = useMovieId();
  const [movieDetail, setMovieDetail] = useState({});

  function renderMovieDetails() {
    api
      .get(`movie/${movieId}?api_key=${apiKey}&language=pt-BR`)
      .then((response) => {
        setMovieDetail(response.data);
      });
  }

  useEffect(() => {
    renderMovieDetails();
  }, []);

  return (
    <div className="movie-container">
      <div>
        <img src={imgUrl + movieDetail.poster_path} />
      </div>
      <div>
        <h2>29132</h2>
      </div>
    </div>
  );
}

export default Details;
