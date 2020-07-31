import React, { useState, useEffect } from 'react';
import './styles.css';
import { api, apiKey, imgUrl } from '../../services/api';
import ScrollContainer from 'react-indiana-drag-scroll';
import { MdStar, MdSearch } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { useMovieId } from '../../Context/ContextProvider';

function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [movieInput, setMovieInput] = useState();
  const [showSearchedSection, setShowSearchedSection] = useState(false);

  const history = useHistory();
  const { handleMovieId } = useMovieId();

  function renderMovies(path, spot) {
    api.get(`${path}?api_key=${apiKey}&language=pt-BR`).then((response) => {
      spot(response.data.results);
    });
  }

  function getSearchedMovies() {
    api
      .get(`search/movie?api_key=${apiKey}&language=pt-BR&query=${movieInput}`)
      .then((response) => {
        setSearchedMovies(response.data.results);
      });
    setShowSearchedSection(true);
  }

  function getMovieDetails(id) {
    handleMovieId(id);
    history.push('/movie');
  }

  useEffect(() => {
    renderMovies('movie/popular', setPopularMovies);
  }, [popularMovies]);

  useEffect(() => {
    renderMovies('movie/top_rated', setTopRatedMovies);
  }, [topRatedMovies]);

  useEffect(() => {
    renderMovies('movie/upcoming', setUpcomingMovies);
  }, [upcomingMovies]);

  useEffect(() => {
    renderMovies('movie/now_playing', setNowPlayingMovies);
  }, [nowPlayingMovies]);

  return (
    <div className="container">
      <header>
        <img src={require('../../assets/logo.svg')} alt="logo" />
        <h1>
          <span>Movie</span>DB
        </h1>
        <div className="search">
          <button onClick={() => getSearchedMovies()}>
            <MdSearch size={20} color="#636363" />
          </button>
          <input
            type="text"
            placeholder="Buscar"
            onChange={(event) => setMovieInput(event.target.value)}
            onKeyDown={(event) =>
              event.keyCode === 13 ? getSearchedMovies() : false
            }
          />
        </div>
      </header>
      <section className="main">
        {showSearchedSection ? (
          <div className="searched-movies">
            <div className="searched-movies-header">
              <h3>Busca</h3>
              <p>Todos os resultados para {movieInput}</p>
            </div>
            <div className="searched-movies-main">
              <ScrollContainer vertical={false} className="scroll-container">
                {searchedMovies.map((movie) =>
                  movie.backdrop_path ? (
                    <div className="searched-movie" key={movie.id}>
                      <img
                        src={imgUrl + movie.backdrop_path}
                        alt={'poster do filme' + movie.title}
                        onClick={() => getMovieDetails(movie.id)}
                      />
                      <h3>{movie.title}</h3>
                      <p>{movie.release_date.split('-', 1)}</p>
                      <div className="rate">
                        <MdStar
                          size={14}
                          color="gold"
                          style={{ marginRight: 10 }}
                        />
                        <p>
                          {movie.vote_average} ({movie.vote_count})
                        </p>
                      </div>
                    </div>
                  ) : (
                    false
                  )
                )}
              </ScrollContainer>
            </div>
          </div>
        ) : (
          false
        )}
        <div className="nowplaying">
          <div className="nowplaying-header">
            <h3>Nos cinemas</h3>
            <p>Filmes em cartaz nos cinemas</p>
          </div>
          <div className="nowplaying-main">
            <ScrollContainer vertical={false} className="scroll-container">
              {nowPlayingMovies.map((movie) =>
                movie.backdrop_path ? (
                  <div className="nowplaying-movie" key={movie.id}>
                    <div>
                      <img
                        src={imgUrl + movie.backdrop_path}
                        alt={'poster do filme' + movie.title}
                        onClick={() => getMovieDetails(movie.id)}
                      />
                    </div>
                    <h3>{movie.title}</h3>
                    <div>
                      <p>{movie.release_date.split('-', 1)}</p>
                    </div>
                    <div className="rate">
                      <MdStar
                        size={14}
                        color="gold"
                        style={{ marginRight: 10 }}
                      />
                      <p>
                        {movie.vote_average} ({movie.vote_count})
                      </p>
                    </div>
                  </div>
                ) : (
                  false
                )
              )}
            </ScrollContainer>
          </div>
        </div>
        <div className="popular">
          <div className="popular-header">
            <h3>Populares</h3>
            <p>Filmes que estão em alta</p>
          </div>
          <div className="popular-main">
            <ScrollContainer vertical={false} className="scroll-container">
              {popularMovies.map((movie) =>
                movie.poster_path ? (
                  <div className="popular-movie" key={movie.id}>
                    <div>
                      <img
                        src={imgUrl + movie.poster_path}
                        alt={'poster do filme' + movie.title}
                        onClick={() => getMovieDetails(movie.id)}
                      />
                    </div>
                    <h3>{movie.title}</h3>
                    <div>
                      <p>{movie.release_date.split('-', 1)}</p>
                    </div>
                    <div className="rate">
                      <MdStar
                        size={14}
                        color="gold"
                        style={{ marginRight: 10 }}
                      />
                      <p>
                        {movie.vote_average} ({movie.vote_count})
                      </p>
                    </div>
                  </div>
                ) : (
                  false
                )
              )}
            </ScrollContainer>
          </div>
        </div>
        <div className="top-rated">
          <div className="top-rated-header">
            <h3>Mais avaliados</h3>
            <p>Filmes mais curtidos pela galera</p>
          </div>
          <div className="top-rated-main">
            <ScrollContainer vertical={false} className="scroll-container">
              {topRatedMovies.map((movie) =>
                movie.poster_path ? (
                  <div className="top-rated-movie" key={movie.id}>
                    <div>
                      <img
                        src={imgUrl + movie.poster_path}
                        alt={'poster do filme' + movie.title}
                        onClick={() => getMovieDetails(movie.id)}
                      />
                    </div>
                    <h3>{movie.title}</h3>
                    <div>
                      <p>{movie.release_date.split('-', 1)}</p>
                    </div>
                    <div className="rate">
                      <MdStar
                        size={14}
                        color="gold"
                        style={{ marginRight: 10 }}
                      />
                      <p>
                        {movie.vote_average} ({movie.vote_count})
                      </p>
                    </div>
                  </div>
                ) : (
                  false
                )
              )}
            </ScrollContainer>
          </div>
        </div>
        <div className="upcoming">
          <div className="upcoming-header">
            <h3>Em breve</h3>
            <p>Filmes que chegarão em breve</p>
          </div>
          <div className="upcoming-main">
            <ScrollContainer className="scroll-container">
              {upcomingMovies.map((movie) =>
                movie.poster_path ? (
                  <div className="upcoming-movie" key={movie.id}>
                    <div>
                      <img
                        src={imgUrl + movie.poster_path}
                        alt={'poster do filme' + movie.title}
                        onClick={() => getMovieDetails(movie.id)}
                      />
                    </div>
                    <h3>{movie.title}</h3>
                    <div>
                      <p>{movie.release_date.split('-', 1)}</p>
                    </div>
                    <div className="rate">
                      <MdStar
                        size={14}
                        color="gold"
                        style={{ marginRight: 10 }}
                      />
                      <p>
                        {movie.vote_average} ({movie.vote_count})
                      </p>
                    </div>
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

export default Home;
