import React, { useState, useEffect } from 'react';
import { useMovieId } from '../../Context/ContextProvider';
import './styles.css';
import './resposivity.css';
import { useHistory } from 'react-router-dom';
import { api, apiKey, imgUrl } from '../../services/api';
import { MdStar, MdArrowBack } from 'react-icons/md';
import ScrollContainer from 'react-indiana-drag-scroll';

function Details() {
  const { movieId } = useMovieId();
  const storagedId = localStorage.getItem('movie_id');
  const [movieDetail, setMovieDetail] = useState([]);
  const [genres, setGenres] = useState([]);
  const [videos, setVideos] = useState([]);

  const history = useHistory();
  function handleNavigateBack() {
    localStorage.clear();
    history.push('/');
  }

  function renderMovieDetails() {
    api
      .get(`movie/${movieId || storagedId}?api_key=${apiKey}&language=pt-BR`)
      .then((response) => {
        setMovieDetail(response.data);
        setGenres(response.data.genres);
      });
    return;
  }
  function getVideos() {
    api
      .get(
        `movie/${movieId || storagedId}/videos?api_key=${apiKey}&language=en-US`
      )
      .then((response) => {
        setVideos(response.data.results);
      });
  }

  useEffect(() => {
    renderMovieDetails();
    getVideos();
  });

  return (
    <div className="container">
      <header className="details-header">
        <MdArrowBack onClick={handleNavigateBack} size={24} color="#ff7e6b" />
        <p>Voltar</p>
      </header>
      <section className="movie-details">
        <div className="poster">
          <img
            src={imgUrl + movieDetail.poster_path}
            alt={`poster do filme ${movieDetail.title}`}
          />
        </div>
        <div className="details">
          <h2>{movieDetail.title}</h2>
          <p>Lançamento {movieDetail.release_date}</p>
          <p>{movieDetail.overview}</p>
          <div className="rate">
            <MdStar size={14} color="gold" style={{ marginRight: 10 }} />
            <p>
              {movieDetail.vote_average} ({movieDetail.vote_count})
            </p>
          </div>
          <div className="genres">
            {genres.map((genre) => (
              <p key={genre.id}>{genre.name}</p>
            ))}
          </div>
          <div className="videos-container">
            <div className="videos-container-header">
              <h2>Vídeos</h2>
            </div>

            <ScrollContainer vertical={false} className="videos-container-main">
              {videos.map((video, index) =>
                video.key ? (
                  <div key={index} className="videos">
                    <iframe
                      src={'https://www.youtube.com/embed/' + video.key}
                      allow="autoplay; encrypted-media"
                      frameBorder="0"
                      allowFullScreen
                      title="video"
                    />
                  </div>
                ) : (
                  false
                )
              )}
            </ScrollContainer>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Details;
